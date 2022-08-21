import { jest } from "@jest/globals";
import EntityNotFoundError from "../../../src/errors/entityNotFoundError.js";
import ProjectRepository from "./../../../src/repositories/projectRepository.js";
import TaskRepository from "./../../../src/repositories/taskRepository.js";
import TaskService from "./../../../src/services/taskService.js";
import database from "./../../../src/util/database.js";

describe("TaskService", () => {
  it("should list tasks of a project", () => {
    const userId = "3f517fc0-da92-4de8-bb6e-b594ab24bb84";
    const projectId = "659215ff-f97a-4123-90f1-e27d68f3be10";

    const tasksDatabaseMock = [
      {
        id: "d620a01e-383b-4f4a-b710-506807e9160a",
        userId: "fdc51954-cb47-45ce-b928-359938e4649b",
        projectId,
        description: "do something important",
      },
      {
        id: "fdc51954-cb47-45ce-b928-359938e4649b",
        userId: "281be9f7-dd1c-4751-b658-4b258edb6402",
        projectId: "a4e5ebff-1251-486e-8ccc-8a7cb7dd9ae8",
        description: "do something right",
      },
      {
        id: "9d6f70e6-662d-4d41-a6af-c601e32911ae",
        userId: "33cea5b1-9b17-4ca2-985e-31eb8877ad4a",
        projectId,
        description: "do something beautiful",
      },
      {
        id: "b7b61f2c-d7a3-4620-9d37-7f7af3677407",
        userId,
        projectId,
        description: "do something useful",
      },
    ];

    const projectsDatabaseMock = [
      {
        id: projectId,
        name: "My Project",
        userId,
      },
    ];

    database.read = jest
      .fn()
      .mockReturnValueOnce(projectsDatabaseMock)
      .mockReturnValueOnce(tasksDatabaseMock);

    const projectRepository = new ProjectRepository({});
    const taskRepository = new TaskRepository({});
    const service = new TaskService({ taskRepository, projectRepository });

    const response = service.list({ userId, projectId });

    expect(response.length).toBe(1);
    expect(
      response.find((p) => p.id === tasksDatabaseMock[0].id)
    ).toBeUndefined();
    expect(
      response.find((p) => p.id === tasksDatabaseMock[1].id)
    ).toBeUndefined();
    expect(
      response.find((p) => p.id === tasksDatabaseMock[2].id)
    ).toBeUndefined();
    expect(
      response.find((p) => p.id === tasksDatabaseMock[3].id)
    ).toBeDefined();
  });

  it("should create a task", () => {
    const userId = "3f517fc0-da92-4de8-bb6e-b594ab24bb84";
    const projectId = "659215ff-f97a-4123-90f1-e27d68f3be10";

    const projectsDatabaseMock = [
      {
        id: projectId,
        name: "My Project",
        userId,
      },
    ];

    database.read = jest.fn().mockReturnValue(projectsDatabaseMock);
    database.write = jest.fn(() => {});

    const projectRepository = new ProjectRepository({});
    const taskRepository = new TaskRepository({});
    const service = new TaskService({ taskRepository, projectRepository });

    const taskMock = {
      userId,
      projectId,
      description: "my first task",
    };

    const response = service.create({ data: taskMock });

    expect(database.write.mock.calls.length).toBe(1);
    expect(database.write.mock.calls[0][2].description).toBe(
      taskMock.description
    );
    expect(database.write.mock.calls[0][2].projectId).toBe(taskMock.projectId);
    expect(database.write.mock.calls[0][2].userId).toBe(taskMock.userId);

    expect(response).toBeDefined();
    expect(response.description).toBe(taskMock.description);
    expect(response.userId).toBe(taskMock.userId);
    expect(response.projectId).toBe(taskMock.projectId);
  });

  it("should not create a task for a another user project", () => {
    const userId = "3f517fc0-da92-4de8-bb6e-b594ab24bb84";
    const projectId = "659215ff-f97a-4123-90f1-e27d68f3be10";

    const projectsDatabaseMock = [
      {
        id: projectId,
        name: "My Project",
        userId: "766b5277-3bcc-4ee5-b176-39673bbfeef7",
      },
    ];

    database.read = jest.fn().mockReturnValue(projectsDatabaseMock);
    database.write = jest.fn(() => {});

    const projectRepository = new ProjectRepository({});
    const taskRepository = new TaskRepository({});
    const service = new TaskService({ taskRepository, projectRepository });

    const taskMock = {
      userId,
      projectId,
      description: "my first task",
    };

    expect(() => {
      service.create({ data: taskMock });
    }).toThrow(EntityNotFoundError);
  });

  it("should update a task name", () => {
    const userId = "3f517fc0-da92-4de8-bb6e-b594ab24bb84";
    const projectId = "659215ff-f97a-4123-90f1-e27d68f3be10";
    const taskId = "d41caa30-9880-4dee-bb55-22e0cf805cbb";

    const tasksDatabaseMock = [
      {
        id: taskId,
        userId,
        projectId,
        description: "do something",
      },
    ];

    const projectsDatabaseMock = [
      {
        id: projectId,
        name: "My Project",
        userId,
      },
    ];

    database.read = jest
      .fn()
      .mockReturnValueOnce(projectsDatabaseMock)
      .mockReturnValueOnce(tasksDatabaseMock);

    database.overwrite = jest.fn(() => {});

    const projectRepository = new ProjectRepository({});
    const taskRepository = new TaskRepository({});
    const service = new TaskService({ taskRepository, projectRepository });

    const taskMock = {
      userId,
      projectId,
      description: "my first task",
    };

    const response = service.update({ id: taskId, data: taskMock });

    expect(database.overwrite.mock.calls.length).toBe(1);

    expect(response).toBeDefined();
    expect(response.id).toBe(taskId);
    expect(response.description).toBe(taskMock.description);
  });

  it("should mark a task as done", () => {
    const userId = "3f517fc0-da92-4de8-bb6e-b594ab24bb84";
    const projectId = "659215ff-f97a-4123-90f1-e27d68f3be10";
    const taskId = "d41caa30-9880-4dee-bb55-22e0cf805cbb";

    const tasksDatabaseMock = [
      {
        id: taskId,
        userId,
        projectId,
        description: "do something",
        finishedAt: null,
      },
    ];

    const projectsDatabaseMock = [
      {
        id: projectId,
        name: "My Project",
        userId,
      },
    ];

    database.read = jest
      .fn()
      .mockReturnValueOnce(projectsDatabaseMock)
      .mockReturnValueOnce(tasksDatabaseMock);

    database.overwrite = jest.fn(() => {});

    const freezeDate = new Date("2020-01-01");
    jest.useFakeTimers().setSystemTime(freezeDate);

    const projectRepository = new ProjectRepository({});
    const taskRepository = new TaskRepository({});
    const service = new TaskService({ taskRepository, projectRepository });

    const taskMock = {
      userId,
      projectId,
      done: true,
    };

    const response = service.update({ id: taskId, data: taskMock });

    expect(database.overwrite.mock.calls.length).toBe(1);

    expect(response).toBeDefined();
    expect(response.id).toBe(taskId);
    expect(response.finishedAt).toStrictEqual(freezeDate);
  });

  it("should prevent update finishedAt task value", () => {
    const userId = "3f517fc0-da92-4de8-bb6e-b594ab24bb84";
    const projectId = "659215ff-f97a-4123-90f1-e27d68f3be10";
    const taskId = "d41caa30-9880-4dee-bb55-22e0cf805cbb";

    const tasksDatabaseMock = [
      {
        id: taskId,
        userId,
        projectId,
        description: "do something",
        finishedAt: null,
      },
    ];

    const projectsDatabaseMock = [
      {
        id: projectId,
        name: "My Project",
        userId,
      },
    ];

    database.read = jest
      .fn()
      .mockReturnValueOnce(projectsDatabaseMock)
      .mockReturnValueOnce(tasksDatabaseMock);

    database.overwrite = jest.fn(() => {});

    const freezeDate = new Date("2020-01-01");
    jest.useFakeTimers().setSystemTime(freezeDate);

    const projectRepository = new ProjectRepository({});
    const taskRepository = new TaskRepository({});
    const service = new TaskService({ taskRepository, projectRepository });

    const taskMock = {
      userId,
      projectId,
      done: true,
      finishedAt: new Date("2022-12-31"),
    };

    const response = service.update({ id: taskId, data: taskMock });

    expect(database.overwrite.mock.calls.length).toBe(1);

    expect(response).toBeDefined();
    expect(response.id).toBe(taskId);
    expect(response.finishedAt).toStrictEqual(freezeDate);
  });

  it("should delete a task", () => {
    const userId = "3f517fc0-da92-4de8-bb6e-b594ab24bb84";
    const projectId = "659215ff-f97a-4123-90f1-e27d68f3be10";
    const taskId = "d41caa30-9880-4dee-bb55-22e0cf805cbb";

    const tasksDatabaseMock = [
      {
        id: taskId,
        userId,
        projectId,
        description: "do something",
        finishedAt: null,
      },
    ];

    const projectsDatabaseMock = [
      {
        id: projectId,
        name: "My Project",
        userId,
      },
    ];

    database.read = jest
      .fn()
      .mockReturnValueOnce(projectsDatabaseMock)
      .mockReturnValueOnce(tasksDatabaseMock);

    database.overwrite = jest.fn(() => {});

    const projectRepository = new ProjectRepository({});
    const taskRepository = new TaskRepository({});
    const service = new TaskService({ taskRepository, projectRepository });

    const response = service.delete({ id: taskId, userId, projectId });

    expect(database.overwrite.mock.calls.length).toBe(1);
    expect(database.overwrite.mock.calls[0][2]).toStrictEqual([]);

    expect(response).toBeDefined();
    expect(response.id).toBe(taskId);
  });
});

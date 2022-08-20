import { jest } from "@jest/globals";
import ProjectRepository from "../../src/repositories/projectRepository.js";
import ProjectService from "../../src/services/projectService.js";
import database from "../../src/util/database.js";

describe("ProjectService", () => {
  it("should test user project list service", () => {
    const userId = "3f517fc0-da92-4de8-bb6e-b594ab24bb84";
    const projectId1 = "d620a01e-383b-4f4a-b710-506807e9160a";
    const projectId2 = "fdc51954-cb47-45ce-b928-359938e4649b";
    const projectId3 = "9d6f70e6-662d-4d41-a6af-c601e32911ae";

    const databaseMock = [
      {
        id: projectId1,
        userId,
        name: "Lorem ipsum",
      },
      {
        id: projectId2,
        userId: "281be9f7-dd1c-4751-b658-4b258edb6402",
        name: "Dolor sit amet",
      },
      {
        id: projectId3,
        userId,
        name: "Consectetur adipiscing",
      },
    ];

    database.read = jest.fn().mockReturnValue(databaseMock);

    const projectRepository = new ProjectRepository({});
    const service = new ProjectService({ projectRepository });

    const response = service.list(userId);

    expect(response.length).toBe(2);
    expect(response.find((p) => p.id === projectId1)).toBeDefined();
    expect(response.find((p) => p.id === projectId3)).toBeDefined();
    expect(response.find((p) => p.id === projectId2)).toBeUndefined();
  });

  it("should test user project create service", () => {
    const userId = "3f517fc0-da92-4de8-bb6e-b594ab24bb84";
    const name = "Lorem ipsum";
    const projectMock = { userId, name };

    database.write = jest.fn(() => {});

    const projectRepository = new ProjectRepository({});
    const service = new ProjectService({ projectRepository });

    const response = service.create(projectMock);

    expect(database.write.mock.calls.length).toBe(1);
    expect(database.write.mock.calls[0][2].name).toBe(name);
    expect(database.write.mock.calls[0][2].userId).toBe(userId);

    expect(response.name).toBe(name);
    expect(response.userId).toBe(userId);
  });
});

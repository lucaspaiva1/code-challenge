import { jest } from "@jest/globals";
import UserRepository from "../../src/repositories/userRepository";
import UserService from "../../src/services/userService";
import database from "../../src/util/database.js";

describe("UserService", () => {
  it("should test user create service", () => {
    database.write = jest.fn(() => {});
    database.read = jest.fn().mockReturnValue([]);

    const userMock = {
      fullName: "User test",
      username: "user",
      password: "password123",
    };

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    const response = service.create({ data: userMock });

    expect(database.write.mock.calls.length).toBe(1);
    expect(database.write.mock.calls[0][2].fullName).toBe(userMock.fullName);
    expect(database.write.mock.calls[0][2].username).toBe(userMock.username);

    expect(response.id.length > 30).toBe(true);
    expect(response.fullName).toBe(userMock.fullName);
    expect(response.username).toBe(userMock.username);
    expect(response.password).toBeUndefined();
  });

  it("should test user create service with duplicated username", () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
      },
    ];

    const userMock = {
      fullName: "Second User",
      username: "username",
    };

    database.read = jest.fn().mockReturnValue(databaseMock);
    database.write = jest.fn(() => {});

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    const response = service.create({ data: userMock });

    expect(database.write.mock.calls.length).toBe(0);

    expect(response).toBe(null);
  });
});

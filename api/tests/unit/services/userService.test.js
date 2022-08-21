import { jest } from "@jest/globals";
import InvalidCredentialsError from "../../../src/errors/invalidCredentials";
import UserAlreadyExists from "../../../src/errors/userAlreadyExists";
import UserRepository from "./../../../src/repositories/userRepository";
import UserService from "./../../../src/services/userService";
import database from "./../../../src/util/database.js";

describe("UserService", () => {
  it("create user with success", () => {
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

  it("create user with duplicated username", () => {
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

    expect(() => {
      service.create({ data: userMock });
    }).toThrow(UserAlreadyExists);
  });

  it("authenticate user with success", () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
        password: "password123",
      },
    ];

    const authMock = {
      username: "username",
      password: "password123",
    };

    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    const response = service.authenticate(authMock);

    expect(database.read.mock.calls.length).toBe(1);

    expect(response).toBeDefined();
    expect(response.id).toBe(databaseMock[0].id);
    expect(response.fullName).toBe(databaseMock[0].fullName);
    expect(response.username).toBe(databaseMock[0].username);
    expect(response.password).toBeUndefined();
  });

  it("authenticate user without username", () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
        password: "password123",
      },
    ];

    const authMock = {
      username: "",
      password: "password123",
    };

    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    expect(() => {
      service.authenticate(authMock);
    }).toThrow(InvalidCredentialsError);
  });

  it("authenticate user without password", () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
        password: "password123",
      },
    ];

    const authMock = {
      username: "username",
      password: "",
    };

    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    expect(() => {
      service.authenticate(authMock);
    }).toThrow(InvalidCredentialsError);
  });

  it("authenticate user with wrong credentials", () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
        password: "password123",
      },
    ];

    const authMock = {
      username: "username",
      password: "password1234",
    };

    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    expect(() => {
      service.authenticate(authMock);
    }).toThrow(InvalidCredentialsError);
  });
});

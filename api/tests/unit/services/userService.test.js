import { jest } from "@jest/globals";
import InvalidCredentialsError from "../../../src/errors/invalidCredentials";
import UserAlreadyExists from "../../../src/errors/userAlreadyExists";
import UserRepository from "./../../../src/repositories/userRepository";
import UserService from "./../../../src/services/userService";
import database from "./../../../src/util/database.js";

const hashedPassword =
  "$2b$10$xfYpwpb5rG4zB4ADblrG2.Vlpve2xruVhWlLeJ2AEWdeEffKDLbPi";

describe("UserService", () => {
  it("create user with success", async () => {
    database.write = jest.fn(() => {});
    database.read = jest.fn().mockReturnValue([]);

    const userMock = {
      fullName: "User test",
      username: "user",
      password: hashedPassword,
    };

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    const response = await service.create({ data: userMock });

    await expect(database.write.mock.calls.length).toBe(1);
    await expect(database.write.mock.calls[0][2].fullName).toBe(
      userMock.fullName
    );
    await expect(database.write.mock.calls[0][2].username).toBe(
      userMock.username
    );
    await expect(response.id.length > 30).toBe(true);
    await expect(response.fullName).toBe(userMock.fullName);
    await expect(response.username).toBe(userMock.username);
    await expect(response.password).toBeUndefined();
  });

  it("should not create user with duplicated username", async () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
        password: hashedPassword,
      },
    ];

    database.read = jest.fn().mockReturnValue(databaseMock);
    database.write = jest.fn(() => {});

    const userMock = {
      fullName: "Second User",
      username: "username",
      password: "password",
    };

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    await expect(async () => {
      await service.create({ data: userMock });
    }).rejects.toThrow(UserAlreadyExists);
  });

  it("authenticate user with success", async () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
        password: hashedPassword,
      },
    ];

    const authMock = {
      username: "username",
      password: "password",
    };

    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    const response = await service.authenticate(authMock);

    await expect(database.read.mock.calls.length).toBe(1);

    await expect(response).toBeDefined();
    await expect(response.id).toBe(databaseMock[0].id);
    await expect(response.fullName).toBe(databaseMock[0].fullName);
    await expect(response.username).toBe(databaseMock[0].username);
    await expect(response.password).toBeUndefined();
  });

  it("authenticate user without username", async () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
        password: hashedPassword,
      },
    ];

    const authMock = {
      username: "",
      password: "password",
    };

    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    await expect(async () => {
      await service.authenticate(authMock);
    }).rejects.toThrow(InvalidCredentialsError);
  });

  it("authenticate user without password", async () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
        password: hashedPassword,
      },
    ];

    const authMock = {
      username: "username",
      password: "",
    };

    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    await expect(async () => {
      await service.authenticate(authMock);
    }).rejects.toThrow(InvalidCredentialsError);
  });

  it("authenticate user with wrong credentials", async () => {
    const databaseMock = [
      {
        id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
        fullName: "First User",
        username: "username",
        password: hashedPassword,
      },
    ];

    const authMock = {
      username: "username",
      password: "password1234",
    };

    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const service = new UserService({ userRepository });

    await expect(async () => {
      await service.authenticate(authMock);
    }).rejects.toThrow(InvalidCredentialsError);
  });
});

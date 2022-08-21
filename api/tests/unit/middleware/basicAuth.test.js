import { jest } from "@jest/globals";
import InvalidCredentialsError from "../../../src/errors/invalidCredentials.js";
import basicAuth from "./../../../src/middlewares/basicAuth.js";
import UserRepository from "./../../../src/repositories/userRepository.js";
import UserService from "./../../../src/services/userService.js";
import database from "./../../../src/util/database.js";

const password = "password";
const hashedPassword =
  "$2b$10$xfYpwpb5rG4zB4ADblrG2.Vlpve2xruVhWlLeJ2AEWdeEffKDLbPi";

const generateBasicHeader = ({ username, password }) => {
  const credentials = `${username}:${password}`;
  return Buffer.from(credentials).toString("base64");
};

const databaseMock = [
  {
    id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
    fullName: "User",
    username: "username",
    password: hashedPassword,
  },
];

describe("BasicAuthMiddleware", () => {
  let res;
  let next;

  beforeEach(() => {
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    next = jest.fn(() => {});
  });

  it("should authorize user with correct token", async () => {
    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const userService = new UserService({ userRepository });

    const req = jest.fn(() => ({
      headers: {
        authorization: `Basic ${generateBasicHeader({
          username: databaseMock[0].username,
          password: password,
        })}`,
      },
    }));

    await basicAuth({ userService })(req(), res, next);

    await expect(next.mock.calls.length).toBe(1);
  });

  it("should not authorize user with invalid credentials", async () => {
    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const userService = new UserService({ userRepository });

    const req = jest.fn(() => ({
      headers: {
        authorization: `Basic ${generateBasicHeader({
          username: databaseMock[0].username,
          password: "wrongPassword",
        })}`,
      },
    }));

    await expect(async () => {
      await basicAuth({ userService })(req(), res, next);
    }).rejects.toThrow(InvalidCredentialsError);
  });

  it("should not authorize user without authorization header", async () => {
    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const userService = new UserService({ userRepository });

    const req = jest.fn(() => ({
      headers: {},
    }));

    await basicAuth({ userService })(req(), res, next);

    await expect(next.mock.calls.length).toBe(0);
    await expect(res.status.mock.calls.length).toBe(1);
    await expect(res.status.mock.calls[0][0]).toBe(401);
    await expect(res.json.mock.calls[0][0].message).toBe(
      "missing authorization header"
    );
  });
});

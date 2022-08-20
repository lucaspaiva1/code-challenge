import { jest } from "@jest/globals";
import basicAuth from "./../../../src/middlewares/basicAuth.js";
import UserRepository from "./../../../src/repositories/userRepository.js";
import UserService from "./../../../src/services/userService.js";
import database from "./../../../src/util/database.js";

const generateBasicHeader = ({ username, password }) => {
  const credentials = `${username}:${password}`;
  return Buffer.from(credentials).toString("base64");
};

const databaseMock = [
  {
    id: "3f517fc0-da92-4de8-bb6e-b594ab24bb84",
    fullName: "User",
    username: "username",
    password: "password123",
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

  it("should authorize user with correct token", () => {
    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const userService = new UserService({ userRepository });

    const req = jest.fn(() => ({
      headers: {
        authorization: `Basic ${generateBasicHeader({
          username: databaseMock[0].username,
          password: databaseMock[0].password,
        })}`,
      },
    }));

    basicAuth({ userService })(req(), res, next);

    expect(next.mock.calls.length).toBe(1);
  });

  it("should not authorize user with invalid credentials", () => {
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

    basicAuth({ userService })(req(), res, next);

    expect(next.mock.calls.length).toBe(0);
    expect(res.status.mock.calls.length).toBe(1);
    expect(res.status.mock.calls[0][0]).toBe(401);
    expect(res.json.mock.calls[0][0].message).toBe(
      "invalid authorization header"
    );
  });

  it("should not authorize user without authorization header", () => {
    database.read = jest.fn().mockReturnValue(databaseMock);

    const userRepository = new UserRepository({});
    const userService = new UserService({ userRepository });

    const req = jest.fn(() => ({
      headers: {},
    }));

    basicAuth({ userService })(req(), res, next);

    expect(next.mock.calls.length).toBe(0);
    expect(res.status.mock.calls.length).toBe(1);
    expect(res.status.mock.calls[0][0]).toBe(401);
    expect(res.json.mock.calls[0][0].message).toBe(
      "missing authorization header"
    );
  });
});

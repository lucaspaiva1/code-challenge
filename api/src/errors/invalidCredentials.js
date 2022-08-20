import HttpError from "./httpError.js";

export default class InvalidCredentialsError extends HttpError {
  constructor() {
    super({ message: "Invalid credentials", httpCode: 401 });
  }
}

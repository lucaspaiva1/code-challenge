import HttpError from "./httpError.js";

export default class UserAlreadyExists extends HttpError {
  constructor() {
    super({ message: "User already exists", httpCode: 400 });
  }
}

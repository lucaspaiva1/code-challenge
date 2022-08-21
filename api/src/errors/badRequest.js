import HttpError from "./httpError.js";

export default class BadRequestError extends HttpError {
  constructor() {
    super({ message: "bad request", httpCode: 400 });
  }
}

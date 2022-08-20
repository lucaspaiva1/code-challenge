import HttpError from "./httpError.js";

export default class EntityNotFoundError extends HttpError {
  constructor() {
    super({ message: "Entity not found", httpCode: 404 });
  }
}

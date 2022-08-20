export default class HttpError extends Error {
  constructor({ message, httpCode }) {
    super(message);

    this.httpCode = httpCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

import { randomUUID } from "crypto";

export default class User {
  constructor({}) {
    this.id = randomUUID();
  }
}

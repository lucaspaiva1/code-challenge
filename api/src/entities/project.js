import { randomUUID } from "crypto";

export default class Project {
  constructor({ userId, name }) {
    this.id = randomUUID();
    this.userId = userId;
    this.name = name;
  }
}

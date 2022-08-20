import { randomUUID } from "crypto";

export default class Project {
  constructor({ userId, name }, generateId = true) {
    if (generateId) {
      this.id = randomUUID();
    }
    this.userId = userId;
    this.name = name;
  }
}

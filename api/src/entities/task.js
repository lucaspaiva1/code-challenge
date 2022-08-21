import { randomUUID } from "crypto";

export default class Task {
  constructor(
    { projectId, userId, description, finishedAt },
    generateId = true
  ) {
    if (generateId) {
      this.id = randomUUID();
    }
    this.projectId = projectId;
    this.userId = userId;
    this.description = description;
    this.finishedAt = finishedAt;
  }
}

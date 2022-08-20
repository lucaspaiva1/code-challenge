import { randomUUID } from "crypto";

export default class Task {
  constructor({ projectId, description, finishedAt }) {
    this.id = randomUUID();
    this.projectId = projectId;
    this.description = description;
    this.finishedAt = finishedAt;
  }
}

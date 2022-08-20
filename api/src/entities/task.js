import { randomUUID } from "crypto";

export default class Task {
  constructor({}) {
    this.id = randomUUID();
  }
}

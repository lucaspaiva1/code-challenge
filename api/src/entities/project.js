import { randomUUID } from "crypto";

export default class Project {
  constructor({}) {
    this.id = randomUUID();
  }
}

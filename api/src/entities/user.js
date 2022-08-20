import { randomUUID } from "crypto";

export default class User {
  constructor({ username, password, fullName }) {
    this.id = randomUUID();
    this.fullName = fullName;
    this.username = username;
    this.password = password;
  }
}

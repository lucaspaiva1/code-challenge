import database from "../util/database.js";

export default class UserRepository {
  constructor({ file }) {
    this.file = file;
    this.source = "users";
  }

  readDatabaseContent() {
    return database.read(this.file, this.source);
  }

  findByUsername(username) {
    const data = this.readDatabaseContent();
    return data.find((u) => u.username === username);
  }

  create(data) {
    database.write(this.file, this.source, data);
    return data;
  }

  list() {
    return this.readDatabaseContent();
  }
}

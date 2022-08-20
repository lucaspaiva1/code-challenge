import database from "../util/database.js";

export default class UserRepository {
  constructor({ file }) {
    this.file = file;
  }

  readDatabaseContent() {
    return database.read(this.file, this.source);
  }

  create(data) {
    database.write(this.file, this.source, data);
    return data;
  }
}

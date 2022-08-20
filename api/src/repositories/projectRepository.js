import database from "../util/database.js";

export default class ProjectRepository {
  constructor({ file }) {
    this.file = file;
    this.source = "projects";
  }

  readDatabaseContent() {
    return database.read(this.file, this.source);
  }

  find() {
    return database.read(this.file, this.source);
  }

  list(userId) {
    const projects = this.readDatabaseContent();
    const result = projects.filter((p) => p.userId === userId);

    return result;
  }

  create(data) {
    return write(this.file, this.source, data);
  }
}

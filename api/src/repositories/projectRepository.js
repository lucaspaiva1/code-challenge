import database from "../util/database.js";

export default class ProjectRepository {
  constructor({ file }) {
    this.file = file;
    this.source = "projects";
  }

  readDatabaseContent() {
    return database.read(this.file, this.source);
  }

  find({ userId, projectId }) {
    return this.readDatabaseContent().find(
      (p) => p.userId === userId && p.projectId === projectId
    );
  }

  list(userId) {
    const projectList = this.readDatabaseContent();
    return projectList.filter((p) => p.userId === userId);
  }

  create(data) {
    database.write(this.file, this.source, data);
    return data;
  }

  update(id, userId, data) {
    let project = null;

    const projectList = this.readDatabaseContent();
    const projectListUpdated = projectList.map((item) => {
      if (item.id === id && item.userId === userId) {
        project = { ...item, ...data };
        return project;
      }
      return data;
    });

    if (project) database.overwrite(this.file, this.source, projectListUpdated);

    return project;
  }

  delete(id, userId) {
    let project = null;

    const projectList = this.readDatabaseContent();
    const projectListUpdated = projectList.filter((item) => {
      if (item.id === id && item.userId === userId) {
        project = { ...item };
        return false;
      }
      return true;
    });

    if (project) database.overwrite(this.file, this.source, projectListUpdated);

    return project;
  }
}

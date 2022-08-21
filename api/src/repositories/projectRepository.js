import database from "../util/database.js";
import { merge } from "./../util/merge.js";

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
      (p) => p.userId === userId && p.id === projectId
    );
  }

  list(userId, withTasks = false) {
    const projectList = this.readDatabaseContent();
    const filteredList = projectList.filter((p) => p.userId === userId);

    if (!withTasks) return filteredList;

    const tasks = database.read(this.file, "tasks");

    return filteredList.map((p) => {
      return {
        ...p,
        tasks: tasks.filter((t) => t.projectId === p.id),
      };
    });
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
        project = merge(item, data);
        return project;
      }
      return item;
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

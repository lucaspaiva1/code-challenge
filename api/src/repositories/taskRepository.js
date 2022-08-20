import database from "../util/database.js";

export default class TaskRepository {
  constructor({ file }) {
    this.file = file;
    this.source = "tasks";
  }

  readDatabaseContent() {
    return database.read(this.file, this.source);
  }

  list({ userId, projectId }) {
    const taskList = this.readDatabaseContent();
    return taskList.filter(
      (p) => p.userId === userId && p.projectId === projectId
    );
  }

  create(data) {
    database.write(this.file, this.source, data);
    return data;
  }

  update(id, userId, data) {
    let task = null;

    const taskList = this.readDatabaseContent();

    const taskListUpdated = taskList.map((item) => {
      if (item.id === id && item.userId === userId) {
        task = { ...item, ...data };
        return task;
      }
      return data;
    });

    if (task) database.overwrite(this.file, this.source, taskListUpdated);

    return task;
  }

  delete(id, userId) {
    let task = null;

    const taskList = this.readDatabaseContent();

    const taskListUpdated = taskList.filter((item) => {
      if (item.id === id && item.userId === userId) {
        task = { ...item };
        return false;
      }
      return true;
    });

    if (task) database.overwrite(this.file, this.source, taskListUpdated);

    return task;
  }
}

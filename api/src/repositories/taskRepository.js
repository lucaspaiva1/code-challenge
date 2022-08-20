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

  update(id, data) {
    let task = null;

    const taskList = this.list({
      userId: data.userId,
      projectId: data.projectId,
    });

    const taskListUpdated = taskList.map((p) => {
      if (p.id === id) {
        task = { ...p, ...data };
        return task;
      }
      return data;
    });

    if (task) database.overwrite(this.file, this.source, taskListUpdated);

    return task;
  }
}

import Task from "../entities/task.js";
import EntityNotFoundError from "../errors/entityNotFoundError.js";

export default class TaskService {
  constructor({ taskRepository, projectRepository }) {
    this.taskRepository = taskRepository;
    this.projectRepository = projectRepository;
  }

  #checkUserProject({ userId, projectId }) {
    if (!this.projectRepository.find({ userId, projectId })) {
      throw new EntityNotFoundError();
    }
    return true;
  }

  list({ userId, projectId }) {
    this.#checkUserProject({ userId, projectId });
    return this.taskRepository.list({ userId, projectId });
  }

  create({ data }) {
    const task = new Task(data);
    const { userId, projectId } = task;
    this.#checkUserProject({ userId, projectId });
    return this.taskRepository.create(task);
  }

  update({ id, data }) {
    const task = new Task(data, false);

    const { userId, projectId } = task;

    delete task.finishedAt;

    this.#checkUserProject({ userId, projectId });

    if (data.done === true) {
      task.finishedAt = new Date();
    }

    const updatedTask = this.taskRepository.update(id, userId, task);

    if (!updatedTask) {
      throw new EntityNotFoundError();
    }

    return updatedTask;
  }

  delete({ id, userId, projectId }) {
    this.#checkUserProject({ userId, projectId });

    const task = this.taskRepository.delete(id, userId);

    if (!task) {
      throw new EntityNotFoundError();
    }

    return task;
  }
}

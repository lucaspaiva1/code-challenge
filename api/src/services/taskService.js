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
    const { userId, projectId } = data;
    this.#checkUserProject({ userId, projectId });
    return this.taskRepository.create(data);
  }

  update({ id, data }) {
    const { userId, projectId } = data;

    delete data.finishedAt;

    this.#checkUserProject({ userId, projectId });

    if (data.done === true) {
      data.finishedAt = new Date();
    }

    const task = this.taskRepository.update(id, userId, data);

    if (!task) {
      throw new EntityNotFoundError();
    }

    return task;
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

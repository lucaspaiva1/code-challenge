export default class TaskService {
  constructor({ taskRepository, projectRepository }) {
    this.taskRepository = taskRepository;
    this.projectRepository = projectRepository;
  }

  #checkUserProject({ userId, projectId }) {
    if (!this.projectRepository.find({ userId, projectId })) {
      return null;
    }
    return true;
  }

  list({ userId, projectId }) {
    if (!this.#checkUserProject({ userId, projectId })) {
      return null;
    }
    return this.taskRepository.list({ userId, projectId });
  }

  create(data) {
    const { userId, projectId } = data;
    if (!this.#checkUserProject({ userId, projectId })) {
      return null;
    }
    return this.taskRepository.create(data);
  }

  update({ id, data }) {
    const { userId, projectId } = data;

    delete data.finishedAt;

    if (!this.#checkUserProject({ userId, projectId })) {
      return null;
    }

    if (data.done === true) {
      data.finishedAt = new Date();
    }

    return this.taskRepository.update(id, data);
  }

  delete(data) {
    const { userId, projectId } = data;
    if (!this.#checkUserProject({ userId, projectId })) {
      return null;
    }
    return this.taskRepository.create(data);
  }
}

import EntityNotFoundError from "../errors/entityNotFoundError.js";

export default class ProjectService {
  constructor({ projectRepository }) {
    this.projectRepository = projectRepository;
  }

  list({ userId }, withTasks = false) {
    return this.projectRepository.list(userId, withTasks);
  }

  create({ data }) {
    return this.projectRepository.create(data);
  }

  update({ id, userId, data }) {
    const project = this.projectRepository.update(id, userId, data);
    if (!project) {
      throw new EntityNotFoundError();
    }
    return project;
  }

  delete({ id, userId }) {
    const project = this.projectRepository.delete(id, userId);
    if (!project) {
      throw new EntityNotFoundError();
    }
    return project;
  }
}

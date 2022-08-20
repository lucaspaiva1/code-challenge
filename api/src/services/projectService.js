export default class ProjectService {
  constructor({ projectRepository }) {
    this.projectRepository = projectRepository;
  }

  list({ userId }) {
    return this.projectRepository.list(userId);
  }

  create({ data }) {
    return this.projectRepository.create(data);
  }

  update({ id, userId, data }) {
    return this.projectRepository.update(id, userId, data);
  }

  delete({ data }) {
    return this.projectRepository.delete(data);
  }
}

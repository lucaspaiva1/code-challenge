export default class ProjectService {
  constructor({ projectRepository }) {
    this.projectRepository = projectRepository;
  }

  list(userId) {
    return this.projectRepository.list(userId);
  }

  create(data) {
    return this.projectRepository.create(data);
  }

  update(data) {
    return this.projectRepository.update(data);
  }

  delete(data) {
    return this.projectRepository.delete(data);
  }
}

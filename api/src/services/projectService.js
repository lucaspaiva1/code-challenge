export default class ProjectService {
  constructor({ projectRepository }) {
    this.projectRepository = projectRepository;
  }

  find() {
    return this.projectRepository.list();
  }

  list() {
    return this.projectRepository.list();
  }

  create(data) {
    return this.projectRepository.create(data);
  }

  update(data) {
    return this.projectRepository.create(data);
  }

  delete(data) {
    return this.projectRepository.create(data);
  }
}

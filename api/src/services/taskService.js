export default class TaskService {
  constructor({ taskRepository }) {
    this.taskRepository = taskRepository;
  }

  find() {
    return this.taskRepository.list();
  }

  list() {
    return this.taskRepository.list();
  }

  create(data) {
    return this.taskRepository.create(data);
  }

  update(data) {
    return this.taskRepository.create(data);
  }

  delete(data) {
    return this.taskRepository.create(data);
  }
}

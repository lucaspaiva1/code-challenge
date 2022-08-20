export default class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  find() {
    return this.userRepository.list();
  }

  list() {
    return this.userRepository.list();
  }

  create(data) {
    return this.userRepository.create(data);
  }

  update(data) {
    return this.userRepository.create(data);
  }

  delete(data) {
    return this.userRepository.create(data);
  }
}

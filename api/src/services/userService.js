import InvalidCredentialsError from "../errors/invalidCredentials.js";
import User from "./../entities/user.js";

export default class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  find(id) {
    return this.userRepository.find(id);
  }

  create({ data }) {
    const user = new User(data);

    const checkUser = this.userRepository.findByUsername(user.username);

    if (checkUser) {
      return null;
    }

    const createdUser = this.userRepository.create(user);
    delete createdUser.password;

    return createdUser;
  }

  authenticate({ username, password }) {
    if (!username || !password) {
      throw new InvalidCredentialsError();
    }

    const users = this.userRepository.list();
    const user = users.find(
      (u) => u.password === password && u.username === username
    );

    if (!user) {
      throw new InvalidCredentialsError();
    }

    delete user.password;

    return user;
  }
}

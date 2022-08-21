import InvalidCredentialsError from "../errors/invalidCredentials.js";
import BadRequestError from "../errors/badRequest.js";
import UserAlreadyExists from "../errors/userAlreadyExists.js";
import User from "./../entities/user.js";
import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export default class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  find(id) {
    return this.userRepository.find(id);
  }

  async create({ data }) {
    const { password, username, fullName } = data;

    if (!password || !username || !fullName) throw new BadRequestError();

    const hashedPassword = await hashPassword(password);

    const user = new User({ ...data, password: hashedPassword });

    const checkUser = this.userRepository.findByUsername(user.username);

    if (checkUser) {
      throw new UserAlreadyExists();
    }

    const createdUser = this.userRepository.create(user);
    delete createdUser.password;

    return createdUser;
  }

  async authenticate({ username, password }) {
    if (!username || !password) {
      throw new InvalidCredentialsError();
    }

    const users = this.userRepository.list();
    const user = users.find((u) => u.username === username);

    if (!user || !user.password) {
      throw new InvalidCredentialsError();
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new InvalidCredentialsError();
    }

    delete user.password;

    return user;
  }
}

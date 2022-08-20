import UserRepository from "../repositories/userRepository.js";
import UserService from "../services/userService.js";

const generateService = ({ filePath }) => {
  const userRepository = new UserRepository({
    file: filePath,
  });
  const userService = new UserService({
    userRepository,
  });

  return userService;
};

export { generateService };

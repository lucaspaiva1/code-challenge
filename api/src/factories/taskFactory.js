import TaskRepository from "../repositories/taskRepository.js";
import TaskService from "../services/taskService.js";

const generateService = ({ filePath }) => {
  const taskRepository = new TaskRepository({
    file: filePath,
  });
  const taskService = new TaskService({
    taskRepository,
  });

  return taskService;
};

export { generateService };

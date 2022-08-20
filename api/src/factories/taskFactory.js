import TaskRepository from "../repositories/taskRepository.js";
import ProjectRepository from "../repositories/projectRepository.js";
import TaskService from "../services/taskService.js";

const generateService = ({ filePath }) => {
  const taskRepository = new TaskRepository({
    file: filePath,
  });
  const projectRepository = new ProjectRepository({
    file: filePath,
  });
  const taskService = new TaskService({
    taskRepository,
    projectRepository,
  });

  return taskService;
};

export { generateService };

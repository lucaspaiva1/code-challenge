import ProjectRepository from "../repositories/projectRepository.js";
import ProjectService from "../services/projectService.js";

const generateService = ({ filePath }) => {
  const projectRepository = new ProjectRepository({
    file: filePath,
  });
  const projectService = new ProjectService({
    projectRepository,
  });

  return projectService;
};

export { generateService };

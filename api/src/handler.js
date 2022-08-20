import path from "path";
import { fileURLToPath } from "url";

import { Router } from "express";

import { routes as userRoutes } from "./routes/userRoutes.js";
import { routes as projectRoutes } from "./routes/projectRoutes.js";
import { routes as taskRoutes } from "./routes/taskRoutes.js";

import { generateService as generateUserService } from "./factories/userFactory.js";
import { generateService as generateProjectService } from "./factories/projectFactory.js";
import { generateService as generateTaskService } from "./factories/taskFactory.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "./../database", "data.json");

const publicRoutes = Router();
const privateRoutes = Router();

const userService = generateUserService({ filePath });
userRoutes({ publicRoutes, privateRoutes, userService });

const projectService = generateProjectService({ filePath });
projectRoutes({ publicRoutes, privateRoutes, projectService });

const taskService = generateTaskService({ filePath });
taskRoutes({ publicRoutes, privateRoutes, taskService });

export default {
  privateRoutes,
  publicRoutes,
};

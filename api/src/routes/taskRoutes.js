import Task from "../entities/task.js";

const routes = ({ privateRoutes, publicRoutes, taskService }) => {
  privateRoutes.get("/projects/:projectId/tasks", async (req, res, next) => {
    try {
      const response = taskService.list({
        userId: req.userId,
        projectId: req.params.projectId,
      });
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  privateRoutes.post("/projects/:projectId/tasks", async (req, res, next) => {
    try {
      const response = taskService.create({
        data: {
          ...req.body,
          userId: req.userId,
          projectId: req.params.projectId,
        },
      });
      res.status(201).send(response);
    } catch (err) {
      next(err);
    }
  });

  privateRoutes.put(
    "/projects/:projectId/tasks/:taskId",
    async (req, res, next) => {
      try {
        const response = taskService.update({
          id: req.params.taskId,
          data: {
            ...req.body,
            userId: req.userId,
            projectId: req.params.projectId,
          },
        });
        res.send(response);
      } catch (err) {
        next(err);
      }
    }
  );

  privateRoutes.delete(
    "/projects/:projectId/tasks/:taskId",
    async (req, res, next) => {
      try {
        const response = taskService.delete({
          id: req.params.taskId,
          userId: req.userId,
          projectId: req.params.projectId,
        });
        res.send(response);
      } catch (err) {
        next(err);
      }
    }
  );
};

export { routes };

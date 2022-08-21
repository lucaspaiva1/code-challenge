import Project from "../entities/project.js";

const routes = ({ privateRoutes, publicRoutes, projectService }) => {
  privateRoutes.get("/projects", async (req, res, next) => {
    try {
      const response = projectService.list(
        { userId: req.userId },
        req.query.withTasks || false
      );
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  privateRoutes.post("/projects", async (req, res, next) => {
    try {
      const data = new Project({ ...req.body, userId: req.userId });
      const response = projectService.create({ data });
      res.status(201).send(response);
    } catch (err) {
      next(err);
    }
  });

  privateRoutes.put("/projects/:projectId", async (req, res, next) => {
    try {
      const data = new Project({ ...req.body, userId: req.userId }, false);
      const response = projectService.update({
        id: req.params.projectId,
        userId: req.userId,
        data,
      });
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  privateRoutes.delete("/projects/:projectId", async (req, res, next) => {
    try {
      const response = projectService.delete({
        id: req.params.projectId,
        userId: req.userId,
      });
      res.send(response);
    } catch (err) {
      next(err);
    }
  });
};

export { routes };

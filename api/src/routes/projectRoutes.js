const routes = ({ privateRoutes, publicRoutes, projectService }) => {
  privateRoutes.get("/projects", async (req, res) => {
    res.send("projects");
  });
};

export { routes };

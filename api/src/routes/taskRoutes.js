const routes = ({ privateRoutes, publicRoutes, taskService }) => {
  privateRoutes.get("/tasks", async (req, res) => {
    res.send("tasks");
  });
};

export { routes };

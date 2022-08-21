const routes = ({ privateRoutes, publicRoutes, userService }) => {
  publicRoutes.post("/users", async (req, res, next) => {
    try {
      const response = await userService.create({ data: req.body });
      res.status(201).send(response);
    } catch (err) {
      next(err);
    }
  });

  publicRoutes.post("/users/authenticate", async (req, res, next) => {
    try {
      const response = await userService.authenticate(req.body);
      res.send(response);
    } catch (err) {
      next(err);
    }
  });
};

export { routes };

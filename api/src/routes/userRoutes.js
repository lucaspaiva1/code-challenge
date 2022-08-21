const routes = ({ privateRoutes, publicRoutes, userService }) => {
  publicRoutes.post("/users", async (req, res, next) => {
    try {
      const response = userService.create({ data: req.body });
      res.status(201).send(response);
    } catch (err) {
      next(err);
    }
  });

  publicRoutes.post("/users/authenticate", async (req, res, next) => {
    try {
      const response = userService.authenticate(req.body);
      res.send(response);
    } catch (err) {
      next(err);
    }
  });
};

export { routes };

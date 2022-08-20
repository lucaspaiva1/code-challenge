const routes = ({ privateRoutes, publicRoutes, userService }) => {
  privateRoutes.get("/users", async (req, res) => {
    res.send("users");
  });
};

export { routes };

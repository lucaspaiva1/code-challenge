function basicAuth({ userService }) {
  return async (req, res, next) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.includes("Basic ")
    ) {
      return res.status(401).json({ message: "missing authorization header" });
    }

    const encodedCredentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(encodedCredentials, "base64").toString(
      "ascii"
    );

    const [username, password] = credentials.split(":");

    const user = await userService.authenticate({ username, password });

    if (!user) {
      return res.status(401).json({ message: "invalid authorization header" });
    }

    req.userId = user.id;

    next();
  };
}

export default basicAuth;

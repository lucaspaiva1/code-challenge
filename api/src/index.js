import routes, { userService } from "./handler.js";
import express from "express";
import basicAuth from "./middlewares/basicAuth.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/", routes.publicRoutes);
app.use("/", basicAuth({ userService }), routes.privateRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.info(`API listening on port ${port}`);
});

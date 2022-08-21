import routes, { userService } from "./handler.js";
import express from "express";
import cors from "cors";
import basicAuth from "./middlewares/basicAuth.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.use("/", routes.publicRoutes);
app.use("/", basicAuth({ userService }), routes.privateRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.info(`API listening on port ${port}`);
});

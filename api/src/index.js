import routes from "./handler.js";
import express from "express";

const app = express();

const port = process.env.PORT || 3000;

app.use("/", routes.publicRoutes);
app.use("/", routes.privateRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

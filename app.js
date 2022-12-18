const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const mongoose = require("mongoose");
const port = 3000;
require("dotenv").config();

// Connect to DB
connectDB();

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

mongoose.connection.once("open", () => {
  console.log("Connected To MongoDB");
  app.listen(port, console.log(`Server is listening in port ${port}...`));
});

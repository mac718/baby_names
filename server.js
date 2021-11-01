const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const user = require("./routes/users");
const names = require("./routes/names");
const ratings = require("./routes/ratings");
const emails = require("./routes/emails");
const errorHandlerMiddlerware = require("./middleware/errorHandler");
require("dotenv").config();

mongoose.set("useCreateIndex", true);
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")().then(() => next());
  }
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const baseUrl = "/api/v1/";

app.use(`${baseUrl}users`, user);
app.use(`${baseUrl}ratings`, ratings);
app.use(`${baseUrl}names`, names);
app.use(`${baseUrl}emails`, emails);

//app.use("/", user);

app.use(errorHandlerMiddlerware);

app.listen(3001);

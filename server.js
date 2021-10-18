const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const user = require("./routers/user");
const ratings = require("./routers/ratings");
const names = require("./routers/names");

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

const baseUrl = "api/v1/";

app.use("/", user);
app.use("/", ratings);
app.use("/", names);

app.listen(3001);

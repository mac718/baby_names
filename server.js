const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const user = require("./routers/user");
const names = require("./routes/names");
const ratings = require("./routes/ratings");
const errorHandlerMiddlerware = require("./middleware/errorHandler");

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

// app.use(`${baseUrl}/`, user);
app.use(`${baseUrl}ratings`, ratings);
app.use(`${baseUrl}names`, names);

app.use("/", user);

app.use(errorHandlerMiddlerware);

app.listen(3001);

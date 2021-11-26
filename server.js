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
const path = require("path");
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
    origin:
      process.env.NODE_ENV === "production"
        ? "https://rocky-temple-34078.herokuapp.com/"
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "5mb" }));

const baseUrl = "/api/v1/";

app.use(`${baseUrl}users`, user);
app.use(`${baseUrl}ratings`, ratings);
app.use(`${baseUrl}names`, names);
app.use(`${baseUrl}emails`, emails);

app.use(errorHandlerMiddlerware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`${port}`));

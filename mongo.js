const mongoose = require("mongoose");
var env = process.env.NODE_ENV || "development";
const config = require("./config/mongo")[env];

module.exports = () => {
  var envUrl = process.env[config.use_env_variable];
  var localUrl = `mongodb://${config.host}/${config.database}`;
  var mongoUrl = envUrl ? envUrl : localUrl;
  return mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => console.log(err));
};

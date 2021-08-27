const mongoose = require("mongoose");
const repl = require("repl").start({});
const models = require("./models");

require("./mongo")().then(() => {
  // Set `models` to be available in
  // the REPL by name
  repl.context.models = models;

  // Set each model to be available in the REPL
  // by name
  Object.keys(models).forEach((modelName) => {
    repl.context[modelName] = mongoose.model(modelName);
  });

  // Helper function to output the result of
  // a query
  repl.context.lg = (data) => console.log(data);
});

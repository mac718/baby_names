var mongoose = require("mongoose");
var bluebird = require("bluebird");

mongoose.Promise = bluebird;

var models = {};

// Load models and attach to models here
models.User = require("./user");
models.Name = require("./name");
models.Ratings = require("./rating");
models.LinkCode = require("./linkCode");

module.exports = models;

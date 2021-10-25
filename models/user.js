const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    password: String,
    ratings: { type: [Array] },
  },
  { timestamps: true }
);

UserSchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    console.log("document", document);
    bcrypt.hash(document.password, 10, function (err, hashedPassword) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

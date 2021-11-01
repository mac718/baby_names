const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Must enter last name"],
      trim: true,
    },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: [true, "Must enter a password"],
      minLength: 5,
    },
    link: [String],
  },

  { timestamps: true }
);

UserSchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    console.log("document", document);
    bcrypt.hash(document.password, 10, function (err, hashedPassword) {
      if (err) {
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

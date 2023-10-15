const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// Bcrypt vs BcryptJS: https://codeforgeek.com/bcrypt-vs-bcryptjs/

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    passwordAgain: {
      type: String,
      required: [true, "Please Enter a password Again"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId for unique user identifier
      default: new mongoose.Types.ObjectId(), // Automatic generation of userId
    },
  },
  {
    timestamps: true,
  }
);

// static signup method
userSchema.statics.signup = async function (
  name,
  email,
  password,
  passwordAgain
) {
  // validation
  if (!email || !password || !name || !passwordAgain) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  if (password !== passwordAgain) {
    throw Error("Passwords do not match");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    passwordAgain,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);

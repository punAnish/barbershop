require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;
module.exports = {
  NODE_ENV,
  MONGO_URI,
  PORT,
};

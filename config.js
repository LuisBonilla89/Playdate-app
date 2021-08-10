require("dotenv").config();

module.exports = {
  MONGODB:
    "mongodb+srv://" +
    process.env.USER_PASS +
    "@cluster0.fgntw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};

const mongoose = require("mongoose");
require("dotenv").config();

DB_URL = process.env.MONGODB_URI;

const dbConnect = () => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch(() => {
      console.log("ERROR IN DB CONNECTION");
    });
}; 

module.exports = { dbConnect }; 

const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/blog")
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch(() => {
      console.log("ERROR IN DB CONNECTION");
    });
}; 

module.exports = { dbConnect };

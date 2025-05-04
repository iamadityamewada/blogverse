const mongoose = require("mongoose");
var CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const { Blog } = require("./blog");

const UserSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    username: {
      type: String,
      unique: true,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      require: true,
    },
    encry_password: String,
    salt: String,
    is_active: {
      type: Boolean,
      default: true,
    },
    role: {
      type:String,
      enum: ["Admin", "Writter", "Reader"],
      default:"Reader"
    }
  },
  {
    toJSON: { virtuals: true },
    collection: "auth_user",
    timestamps: true,
  }
);

UserSchema.virtual("name").get(function () {
  return this.first_name + " " + this.last_name;
});

UserSchema.virtual("password").set(function (planPassword) {
  this.salt = uuidv4();
  this.encry_password = CryptoJS.HmacSHA1(planPassword, this.salt).toString();
});

UserSchema.methods = {
  authenticate: function (planPassword) {
    return (
      CryptoJS.HmacSHA1(planPassword, this.salt).toString() ===
      this.encry_password
    );
  },
  getUserBlogs: function(){
    return []
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };

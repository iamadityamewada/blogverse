const express = require("express");
const { signUp, login, isAuthenticated, isAuth } = require("../controller/auth");

const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/login", login);
authRoute.get("/is-auth", isAuth);

module.exports = { authRoute };

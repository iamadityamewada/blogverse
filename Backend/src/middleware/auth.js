// is auth
// is admin
// is writter
// isAdminOrWritter
// isReader
const jwt = require("jsonwebtoken");

const { uniqueKey } = require("../config/constant");
const { User } = require("../model/user");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token not found" });

    const data = jwt.verify(token, uniqueKey);
    if (!data?._id)
      return res.status(401).json({ error: "You are not authenticated" });

    // last step
    const user = await User.findById(data?._id);
    if (!user)
      return res.status(401).json({ error: "You are not authenticated" });
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const isAdmin = async (req, res, next) => {
  console.log(req.user.role)
    if (req.user.role !== "Admin")
    return res.status(401).json({ error: "You are not authenticated" });

  next()
};


module.exports = { isAuthenticated, isAdmin };

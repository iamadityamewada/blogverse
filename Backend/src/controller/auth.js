const { uniqueKey } = require("../config/constant");
const { User } = require("../model/user");
var jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const data = req.body;

    // Validation
    let isUser = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });
    if (isUser) {
      return res.status(400).json({ error: "This user already exist" });
    }

    let user = User(data);
    user = await user.save();

    return res.status(201).json({ status: "Registration Done", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// username, password,

const login = async (req, res) => {
  const { username, password } = req.body;
  const isUser = await User.findOne({ username });
  if (!isUser) {
    return res.status(400).json({ error: "Username does not match" });
  }

  if (!isUser.authenticate(password)) {
    return res.status(400).json({ error: "Password does not match" });
  }

  isUser.encry_password = undefined;
  isUser.salt = undefined;

  // last step.
  var token = jwt.sign({ _id: isUser._id }, uniqueKey);

  return res.json({ status: "Login Done", token, user: isUser });
};

const isAuth = async (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  console.log(token)
  if (!token) return res.status(401).json({ error: "Token not found" });

  const data = jwt.verify(token, uniqueKey);
  if (!data?._id)
    return res.status(401).json({ error: "You are not authenticated" });

  // last step
  const user = await User.findById(data?._id);
  if (!user)
    return res.status(401).json({ error: "You are not authenticated" });

  return res.status(200).json({status:"Auth User", user})
};
module.exports = { signUp, login, isAuth};

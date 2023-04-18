const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
bcrypt;
const getUserProfile = async (req, res, next) => {
  const userId = req.user.id; // Assuming you're using JWT or session-based authentication
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  return res.json({ user });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    await User.create({
      name,
      email,
      password: hashedPassword,
      age: " ",
      weight: " ",
      weight_goal: " ",
      height: " ",
      sex: " ",
      activity_level: " ",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const loginUser = async (req, res) => {
  try {
    // Get the email and password off req body
    const { email, password } = req.body;

    // Find the user with requested email
    const user = await User.findOne({ email });

    //if user isn't exist on DB
    if (!user) return res.sendStatus(401);

    // Compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    // token is valid for 14 days
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 14;
    // create a jwt token
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // Set the cookie
    res.cookie("AuthorizationUser", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // send it
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

function logoutUser(req, res) {
  try {
    res.cookie("AuthorizationUser", "", { expires: new Date() });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function checkAuthUser(req, res) {
  try {
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const { name, age, weight, weight_goal, height, sex, activity_level } =
      req.body;

    await User.findByIdAndUpdate(userId, {
      name,
      age,
      weight,
      weight_goal,
      height,
      sex,
      activity_level,
    });

    const user = await User.findById(userId);

    res.json({ user });
  } catch (err) {
    return res.sendStatus(400);
  }
};

module.exports = {
  getUserProfile,
  registerUser,
  loginUser,
  logoutUser,
  checkAuthUser,
  updateUser,
};

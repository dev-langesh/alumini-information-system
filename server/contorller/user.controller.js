const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../model/users.model");
const generateToken = require("../config/generateJWT");
const { sendMail } = require("../config/sendMail");
const { validateEmail } = require("../config/validateEmail");

// @desc     register user
// @route    POST /api/user/register
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    res.json({ error: "Fill all the fields" });
    throw new Error("Please add all fields");
  }

  //check user exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.json({ error: "Invalid Credentials" });
    throw new Error("User already exists");
  }

  //Hashing and encrypting password

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  await sendMail({
    email,
    link: `http://localhost:3000/verify-email/${user._id}`,
    subject: "Verifing Email for AIS Registeration",
  });

  if (user) {
    res.json({
      status: "ok",
    });
  } else {
    res.json({ status: "Invalid credentials" });
  }
});

// @desc     login user
// @route    POST /api/user/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check whether the user is in the db or not
  const user = await User.findOne({ email });

  if (!user) {
    res.json({ error: "Invalid credentials" });
    throw new Error("User not found ");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (user && isCorrectPassword) {
    res.json({
      message: `logged in as ${user.email}`,
      email: user.email,
      _id: user.id,
      name: user.name,
      token: generateToken(user.id),
    });
  } else {
    res.json({ error: "Invalid credentials" });
  }
});

// @desc    register user
// @route   get /api/user/getUser
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.json({ _id, name, email });
});

// @desc    verify email
// @route   get /api/user/verify-email/:id
// @access  Private
async function verifyEmail(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user) {
      res.json({ token: generateToken(id) });
      return;
    }
  } catch (err) {
    if (err) {
      console.log(err);
      res.json({ error: "Unauthorized" });
      return;
    }
  }
}

// @desc    change password
// @route   /api/user/change-password
// @access  private
async function changePassword(req, res) {
  const { password, token } = req.body;

  if (!password || !token) {
    res.json({ error: "Invalid Credentials" });
    return;
  }

  try {
    const { id } = jwt.decode(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(id, {
      $set: { password: hashedPassword },
    });

    console.log(user);

    res.json({ status: "ok" });
    return;
  } catch (err) {
    console.log(err);
    res.send({ error: "User Not Found" });
    return;
  }
}

// @desc    change forgot password
// @route   POST /api/user/send-mail-to-change-forgot-password
// @access  private
async function sendMailToChangeForgotPassword(req, res) {
  const email = req.body.email;

  if (!email) {
    res.json({ error: "Enter Your Email" });
    return;
  }

  if (!validateEmail(email)) {
    res.json({ error: "Invalid Email" });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.json({ error: "User Not Found" });
    return;
  }

  try {
    await sendMail({
      email: email,
      link: `http://localhost:3000/forget-password/${user._id}`,
      subject: "Change Password For AIS",
    });
  } catch (err) {
    console.log(err);
  }

  res.json({ status: "Mail sent success fully" });
}

async function changeForgetPassword(req, res) {
  const { id, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: { password: hashedPassword },
    });
    res.json({ status: "Password Updated" });
  } catch (err) {
    console.log(err);
    res.json({ error: "User Not Found" });
  }
}

module.exports = {
  registerUser,
  getUser,
  loginUser,
  verifyEmail,
  changePassword,
  sendMailToChangeForgotPassword,
  changeForgetPassword,
};

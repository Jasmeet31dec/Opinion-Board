const users = require("../model/user");
const { setUser } = require("../service/auth");
const { isValidEmail, isValidText } = require("./validation");

async function handleUserSignup(req, res) {
  const { fullname, email, password } = req.body;
  let errors = {};
  if (!fullname) {
    errors.fullname = "fullname is required.";
  }
  if (!isValidEmail(email)) {
    errors.email = "Invalid email.";
  }
  if (!isValidText(password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const createdUser = await users.create({
      fullname,
      email,
      password,
    });
    const token = setUser(createdUser);
    return res.status(200).json({ message: "User created", user: createdUser, token: token});
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  let errors = {};
  if (!isValidEmail(email)) {
    errors.email = "Invalid email.";
  }
  if (!isValidText(password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const getUser = await users.findOne({
      email: email,
      password: password,
    });

    if (!getUser) {
      return res.status(400).json({
        message: "Invalid credentials.",
        errors: { credentials: "Invalid email or password entered." },
      });
    }
    const token = setUser(getUser);
    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};

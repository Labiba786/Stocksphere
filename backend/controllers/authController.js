const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ firstName, lastName, email, password });
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({ token }); // Minimal response with just the JWT
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// exports.updateProfile = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (email && email !== user.email) {
//       const emailExists = await User.findOne({ email });
//       if (emailExists) return res.status(400).json({ message: "Email already in use" });
//       user.email = email;
//     }

//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (password) user.password = password;

//     await user.save();
//     res.json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
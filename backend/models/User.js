const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // firstName: { type: String, required: true, trim: true },
    // lastName: { type: String, required: true, trim: true },
    // email: { type: String, required: true, unique: true, lowercase: true },
    // password: { type: String, required: true },
    // agreedToTerms: { type: Boolean, required: true },

    firstName: { type: String, required: true, trim: true, minlength: 2 },
    lastName: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true, minlength: 6 },
    agreedToTerms: { type: Boolean, required: true, default: false },

  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Add method to compare passwords
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

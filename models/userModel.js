import mongoose from "mongoose";
import pkg from "validator";
import bcrypt from "bcrypt";
const { isEmail } = pkg;

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter Your Firstname"],
    // maxlength: [128, "Minimum password length is 6 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter Your Lastname"],
    // minlength: [6, "Minimum password length is 6 characters"],
  },
  nickname: {
    type: String,
    required: [true, "Please Type In a Nickname"],
    minlength: [3, "Minimum  length is 3 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

export default User;

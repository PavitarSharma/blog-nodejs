import User from "../model/user.model.js";
import { generateToken } from "../utils/jwt.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json("Invalid inputs");
    }

    let user = await User.findOne({ email: email }).exec();

    if (user) {
      return res.status(403).json("User already exits");
    }

    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Plese fill all the valid inputs");
    }

    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json("User not found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(422).json("Invalid email & password");
    }

    const token = await generateToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token
    }

    res.status(200).json({
      user: userInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Log out success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

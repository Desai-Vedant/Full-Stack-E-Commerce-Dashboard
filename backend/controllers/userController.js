import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash });

    const token = jwt.sign({ email: email, userId: user._id }, "ncircle", {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({ _id: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginProfile = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ email: email, userId: user._id }, "ncircle", {
          expiresIn: "1h", // Token expiration (optional)
        });

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        return res.status(200).json({ _id: user._id });
      } else {
        return res.status(401).json({ message: "Invalid Credentials!" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(userId, {
      profilePicture: filePath,
    });

    if (user.profilePicture && user.profilePicture !== "/uploads/profile.png") {
      fs.unlink(path.join(__dirname, user.profilePicture), (err) => {
        if (err) console.error(err);
      });
    }

    res
      .status(200)
      .json({ message: "Profile picture updated", profilePicture: filePath });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user.userId;

    const pastUser = await User.findByIdAndUpdate(userId, {
      profilePicture: "/uploads/profile.png",
    });

    if (!pastUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (pastUser.profilePicture != "/uploads/profile.png") {
      fs.unlink(`${__dirname}${pastUser.profilePicture}`, (err) => {
        if (err) {
          console.error("Error while deleting the file:", err.message);
          return;
        }
        console.log("File successfully deleted!");
      });
    }

    res.status(200).json({ message: "Profile picture deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(500).json({ message: "User Does not Exist!" });
    }

    res.status(200).json({
      name: userData.name,
      email: userData.email,
      profilePicture: userData.profilePicture, // Include profile picture
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutProfile = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true, // Matches cookie settings
    secure: true, // Matches cookie settings (false for HTTP in dev)
    sameSite: "none", // Matches cookie settings
  });
  res.status(200).json({ message: "Logged out successfully." });
};

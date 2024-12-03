import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import User from "./models/User.js";
import Product from "./models/Product.js";

import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get the filename of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = path.dirname(__filename);

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store files
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); // Unique file name
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    credentials: true, // Allow cookies to be sent
  })
);
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;
const CONNECT_URL = process.env.CONNECT_URL;

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const pastUser = await User.findOne({ email });
    if (pastUser) {
      return res
        .status(409)
        .json({ message: "User Already Exists! Please Login." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({ name, email, password: hash });

    // Generate JWT token
    const token = jwt.sign({ email, userid: user._id }, "ncircle", {
      expiresIn: "1h",
    });

    // Set cookie with options
    res.cookie("token", token, {
      httpOnly: true, // Prevent client-side JS access
      secure: true, // Use HTTPS (set to false for local development)
      sameSite: "none", // Allow cross-origin requests
    });

    // Respond with user ID
    return res.status(201).json({ _id: user._id });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ email: email, userid: user._id }, "ncircle", {
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
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true, // Matches cookie settings
    secure: true, // Matches cookie settings (false for HTTP in dev)
    sameSite: "none", // Matches cookie settings
  });
  res.status(200).json({ message: "Logged out successfully." });
});

app.post(
  "/upload-profile-picture",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const { userId } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = `/uploads/${req.file.filename}`;

      // Update the user with the profile picture path
      const pastUser = await User.findByIdAndUpdate(userId, {
        profilePicture: filePath,
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

      res
        .status(200)
        .json({ message: "Profile picture updated", profilePicture: filePath });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

app.post("/delete-profile-picture", async (req, res) => {
  try {
    const { userId } = req.body;

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
});

app.post("/addproduct", async (req, res) => {
  try {
    const { name, price, category, userId, company } = req.body;
    const product = await Product.create({
      name,
      price,
      category,
      userId,
      company,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { userId } = req.body;
    const products = await Product.find({ userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/getprofile", async (req, res) => {
  try {
    const { userId } = req.body;
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
});

app.post("/deleteproduct", async (req, res) => {
  try {
    const { productId } = req.body;
    const productData = await Product.findByIdAndDelete(productId);
    if (!productData) {
      res.status(500).json({ message: "Product Does not Exist!" });
    } else {
      res.status(200).json({ message: productData });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/updateproduct", async (req, res) => {
  try {
    const newProductData = req.body;
    const productData = await Product.findByIdAndUpdate(
      newProductData._id,
      newProductData
    );
    if (!productData) {
      res.status(500).json({ message: "Product Does not Exist!" });
    } else {
      res.status(200).json({ message: productData });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await Product.findById(id);
    if (!productDetails) {
      res.send(500).json({ message: "Product Does not Exist!" });
    }
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

mongoose.connect(CONNECT_URL).then(() => {
  console.log("Connected on MongoDB Atlas");
  app.listen(PORT, (err) => {
    if (!err) {
      console.log("Server Started");
    } else {
      console.error(err);
    }
  });
});

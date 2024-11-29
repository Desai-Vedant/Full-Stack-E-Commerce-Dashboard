import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import User from "./models/User.js";
import Product from "./models/Product.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT;
const CONNECT_URL = process.env.CONNECT_URL;

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const pastUser = await User.findOne({ email });
    if (!pastUser) {
      const user = await User.create({ name, email, password });
      res.status(200).json(user);
    } else {
      res.status(500).json({ message: "User Alredy Exists!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(500).json({ message: "Invalid Credentials!" });
    } else {
      if (user.password == password) {
        res.status(200).json(user);
      } else {
        res.status(500).json({ message: "Invalid Credentials!" });
      }
    }
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
      res.status(500).json({ message: "User Does not Exists!" });
    }
    res.status(200).json(userData);
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

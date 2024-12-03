import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
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
};

export const getProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    const products = await Product.find({ userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
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
};

export const getProduct = async (req, res) => {
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
};

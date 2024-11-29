import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  userId: mongoose.Types.ObjectId,
  company: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;

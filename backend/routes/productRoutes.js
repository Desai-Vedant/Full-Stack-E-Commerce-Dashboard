import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add-product", addProduct);
router.post("/get-products", getProducts);
router.post("/delete-product", deleteProduct);
router.post("/update-product", updateProduct);
router.get("/get-product/:id", getProduct);

export default router;

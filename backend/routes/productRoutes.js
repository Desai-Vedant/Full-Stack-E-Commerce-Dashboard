import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProduct,
} from "../controllers/productController.js";
import { authenticateToken } from "../utils/authorization.js";

const router = express.Router();

router.post("/add-product", authenticateToken, addProduct);
router.post("/get-products", authenticateToken, getProducts);
router.post("/delete-product", authenticateToken, deleteProduct);
router.post("/update-product", authenticateToken, updateProduct);
router.get("/get-product/:id", authenticateToken, getProduct);

export default router;

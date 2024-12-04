import express from "express";
import {
  registerUser,
  uploadProfilePicture,
  deleteProfilePicture,
  loginProfile,
  logoutProfile,
  getProfile,
} from "../controllers/userController.js";
import { upload } from "../utils/multerConfig.js";
import { authenticateToken } from "../utils/authorization.js";

const router = express.Router();

router.post("/register", registerUser);
router.post(
  "/upload-profile-picture",
  authenticateToken,
  upload.single("profilePic"),
  uploadProfilePicture
);
router.post("/delete-profile-picture", authenticateToken, deleteProfilePicture);
router.post("/login", loginProfile);
router.post("/logout", authenticateToken, logoutProfile);
router.post("/get-profile", authenticateToken, getProfile);

export default router;

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

const router = express.Router();

router.post("/register", registerUser);
router.post(
  "/upload-profile-picture",
  upload.single("profilePic"),
  uploadProfilePicture
);
router.post("/delete-profile-picture", deleteProfilePicture);
router.post("/login", loginProfile);
router.post("/logout", logoutProfile);
router.post("/get-profile", getProfile);

export default router;

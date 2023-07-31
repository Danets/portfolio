import express from "express";
import { signup, signin, logout, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/logout', logout);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

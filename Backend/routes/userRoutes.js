import express from "express";
import {
    checkAuth,
    followUnfollow,
    getUserProfile,
    loginUser,
    logoutUser,
    signupUser,
    updateUser,
    verifyUser,
} from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/follow/:id", protectRoute, followUnfollow);
router.put("/update/:id", protectRoute, updateUser);
router.get("/check-auth", protectRoute, checkAuth);
router.get("/:id/verify/:token", verifyUser);

export default router;

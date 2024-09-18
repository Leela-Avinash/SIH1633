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
import docAI from "../controllers/docAI.js";


const router = express.Router();

// router.get("/profile/:username", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/:role/:id/verify/:token", verifyUser);
// router.put("/follow/:id", protectRoute, followUnfollow);
// router.put("/update/:id", protectRoute, updateUser);
// router.get("/check-auth", protectRoute, checkAuth);

router.post("/upload",protectRoute, docAI);
export default router;

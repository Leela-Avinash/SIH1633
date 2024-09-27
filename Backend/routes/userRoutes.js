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
    recommendationSystem,
    createPost,
    recommendPosts,
    userPosts,
    resendOtp,
    OtherUserPosts
} from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";
import docAI from "../controllers/docAI.js";
import multer from "multer";


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/profile/:username", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify", verifyUser);
router.post("/resend", resendOtp)
// router.put("/follow/:id", protectRoute, followUnfollow);
router.put("/update/:id", protectRoute, upload.single('profilepic'), updateUser);
router.get("/check-auth", protectRoute, checkAuth);
router.get("/recommendations", protectRoute, recommendationSystem);
router.post("/upload",protectRoute,docAI);
router.post("/post",protectRoute,upload.single('media'),createPost);
router.get("/posts",protectRoute,recommendPosts);
router.get("/userposts",protectRoute,userPosts);
router.post("/userposts", protectRoute, OtherUserPosts)
export default router;

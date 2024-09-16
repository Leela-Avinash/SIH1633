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
import { loginStudent, logoutStudent, signupStudent } from "../controllers/studentController.js";
import { loginAlumni, logoutAlumni, signupAlumni } from "../controllers/alumniController.js";
import docAI from "../controllers/docAI.js";


const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/follow/:id", protectRoute, followUnfollow);
router.put("/update/:id", protectRoute, updateUser);
router.get("/check-auth", protectRoute, checkAuth);
router.get("/:id/verify/:token", verifyUser);

router.post("//signup", signupStudent);
router.post("/student/login", loginStudent);
router.post("/student/logout",logoutStudent);

router.post("/alumni/signup",protectRoute,signupAlumni);
router.post("/alumni/login", protectRoute,loginAlumni);
router.post("/alumni/logout",protectRoute,logoutAlumni);

router.post("/alumni/upload",docAI);



export default router;

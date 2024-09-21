import express from "express";
import { loginStudent, logoutStudent, signupStudent } from "../controllers/studentController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signupStudent);
router.post("/login", loginStudent);
router.post("/logout",logoutStudent);
import express from "express";
import { loginAlumni, logoutAlumni, signupAlumni } from "../controllers/alumniController.js";
import protectRoute from "../middleware/protectRoute.js";

router.post("/signup",protectRoute,signupAlumni);
router.post("/login", protectRoute,loginAlumni);
router.post("/logout",protectRoute,logoutAlumni);

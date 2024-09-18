import Alumni from "../models/alumniModel.js";
import Student from "../models/studentModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { tokenUser } = decoded;
        console.log(decoded);
        console.log(tokenUser);

        let modelName;
        if (tokenUser.role === "alumni") {
            modelName = Alumni;
        } else if (tokenUser.role === "student") {
            modelName = Student;
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
        const user = await modelName.findById(tokenUser.userId).select("-password");

        req.user = user;

        next();
    } catch (err) {
        
        res.status(500).json({ message: err.message });
        console.log("Error from protectRoute: ", err.message);
    }
};

export default protectRoute;
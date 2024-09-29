import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateToken.js";
import sendEmail from "../utils/helpers/sendEmails.js";
import crypto from "crypto";
import Alumni from "../models/alumniModel.js";
import Student from "../models/studentModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import cosineSimilarity from "compute-cosine-similarity";
import Post from "../models/postModel.js";
import Otp from "../models/otpModel.js";
const getUserProfile = async (req, res) => {
    const { username } = req.params;
    let success = false;
    try {
        let user = await Alumni.findOne({ username })
            .select("-password")
            .select("-updatedAt");

        if (!user) {
            user = await Student.findOne({ username })
                .select("-password")
                .select("-updatedAt");
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
        }

        success = true;
        res.status(200).json({ success, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in get user: ", err.message);
    }
};

const signupUser = async (req, res) => {
    try {
        console.log(req.body);
        let success = false;
        const {
            fname,
            lname,
            email,
            username,
            collegeName,
            password,
            role,
            degree,
            gyear,
            gmonth,
            rollnumber,
        } = req.body;

        let modelName, otherModel;
        if (role === "alumni") {
            modelName = Alumni;
            otherModel = Student;
        } else if (role === "student") {
            modelName = Student;
            otherModel = Alumni;
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
        let user = await modelName.findOne({
            $or: [{ email }, { username }],
        });
        if (user) {
            return res
                .status(400)
                .json({ success, message: "Email or username already exists" });
        }
        user = await otherModel.findOne({
            $or: [{ email }, { username }],
        });
        if (user) {
            return res
                .status(400)
                .json({ success, message: "Email or username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await modelName.create({
            fname,
            lname,
            username,
            email,
            collegeName,
            password: hashedPassword,
            role,
            degree,
            gyear,
            gmonth,
            rollnumber,
        });

        const otp = crypto.randomInt(100000, 999999).toString();
        if (user) {
            const Otp_code = await Otp.create({
                email: user.email,
                // token: crypto.randomBytes(32).toString("hex")
                otp: otp,
            });

            // const url = `${process.env.BASE_URL}users/${user.role}/${user._id}/verify/${token.token}`;
            await sendEmail(user.email, "Verify Email", otp);
            success = true;

            res.status(201).json({
                success,
                user: {
                    _id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });
        } else {
            res.status(400).json({ success, message: "Invalid user data" });
        }
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            const message = `${
                field.charAt(0).toUpperCase() + field.slice(1)
            } already exists`;
            return res.status(400).json({ success: false, message });
        }
        res.status(500).json({ success: false, message: err.message });
        console.log("Error in signup user: ", err.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        let success = false;

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

        let user = await Student.findOne(
            isEmail ? { email: identifier } : { username: identifier }
        );
        if (!user) {
            user = await Alumni.findOne(
                isEmail ? { email: identifier } : { username: identifier }
            );
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Invalid Username or Email" });
            }
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        if (!user.email_verified) {
            let Otp_code = await Otp.findOne({ email: user.email });
            if (!Otp_code) {
                const otp = crypto.randomInt(100000, 999999).toString();
                const Otp_code = await Otp.create({
                    email: user.email,
                    otp: otp,
                });

                // const url = `${process.env.BASE_URL}users/${user.role}/${user._id}/verify/${token.token}`;

                await sendEmail(user.email, "Verify Email", otp);
            }
            res.status(400).send({ message: "verification Email Sent" });
        }
        generateTokenAndSetCookie(user._id, user.role, res);
        delete user.password;
        console.log("success");
        success = true;
        res.status(201).json({
            success,
            user,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in login user: ", err.message);
    }
};

const recommendationSystem = async (req, res) => {
    try {
        const currentUserName = req.user.username; // Current user for whom we want recommendations
        const currentUser = await Alumni.findOne({ username: currentUserName });

        if (!currentUser) {
            console.log("Current user not found");
            return;
        }

        // Fetch all users except the current user
        const allUsers = await Alumni.find({
            username: { $ne: currentUserName },
        });

        // Extract all unique skills and interests
        const allSkills = [...new Set(allUsers.flatMap((user) => user.skills))];
        const allInterests = [
            ...new Set(allUsers.flatMap((user) => user.interests)),
        ];

        // Weights for the attributes
        const weights = {
            skills: 5,
            interests: 5,
            collegeName: 4,
            city: 4,
            jobTitle: 3,
        };

        // Function to build a vector for a user
        function buildVector(alumni, allAttributes) {
            let vector = [];

            // College name (1 if the same, 0 if different) multiplied by weight
            vector.push(
                (alumni.collegeName === currentUser.collegeName ? 1 : 0) *
                    weights.collegeName
            );

            // Skills (1 if the skill is present, 0 if not) multiplied by weight
            allAttributes.skills.forEach((skill) => {
                vector.push(
                    (alumni.skills.includes(skill) ? 1 : 0) * weights.skills
                );
            });

            // Interests (1 if the interest is present, 0 if not) multiplied by weight
            allAttributes.interests.forEach((interest) => {
                vector.push(
                    (alumni.interests.includes(interest) ? 1 : 0) *
                        weights.interests
                );
            });

            // City (1 if the same city, 0 if different) multiplied by weight
            vector.push(
                (alumni.Location?.City === currentUser.Location?.City ? 1 : 0) *
                    weights.city
            );

            // Job title (1 if the same, 0 if different) multiplied by weight
            vector.push(
                (alumni.Experience?.some(
                    (exp) =>
                        exp.JobTitle === currentUser.Experience[0]?.JobTitle
                )
                    ? 1
                    : 0) * weights.jobTitle
            );

            return vector;
        }

        // Get vectors for the current user and all other users
        const currentUserVector = buildVector(currentUser, {
            skills: allSkills,
            interests: allInterests,
        });
        const userVectors = allUsers.map((user) => ({
            user,
            vector: buildVector(user, {
                skills: allSkills,
                interests: allInterests,
            }),
        }));

        // Calculate cosine similarity for each user
        const recommendations = userVectors.map(({ user, vector }) => {
            const similarityScore = cosineSimilarity(currentUserVector, vector);
            return { user, score: similarityScore };
        });

        // Sort users by similarity score (highest first)
        recommendations.sort((a, b) => b.score - a.score);

        // Take the top 5 recommendations
        const topRecommendations = recommendations.slice(0, 20);
        console.log("Currect user college name: ", currentUser.collegeName);

        // Log the recommended users
        topRecommendations.forEach((rec) => {
            console.log(
                `Recommended User: ${rec.user.username}, Similarity Score: ${rec.score}`
            );
            // console.log(`Skills: ${rec.user.skills.join(', ')}`);
            // console.log(`College Name: ${rec.user.collegeName}`);
        });
        res.status(201).json({
            topRecommendations,
        });
    } catch (error) {
        console.error("Error during recommendation process", error);
    }
};

const recommendPosts = async (req, res) => {
    try {
        const currentUserName = req.user.username; // Current user for whom we want post recommendations
        const currentUser = await Alumni.findOne({ username: currentUserName });

        if (!currentUser) {
            console.log("Current user not found");
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch all posts and populate author details
        const allPosts = await Post.find({authorId:{$ne:currentUser._id}}).populate('authorId', 'fname profilepic skills'); // Assuming Post is your post model
        // Weights for the attributes
        const weights = {
            tags: 4,
            authorSkills: 3,
        };

        // Function to build a vector for a post based on user attributes
        function buildPostVector(post) {
            const vector = [];
            // console.log(post);

            // Check if post tags match user skills/interests
            const hasTagMatch = post.tags.some(
                (tag) =>
                    currentUser.skills.includes(tag) ||
                    currentUser.interests.includes(tag)
            );
            vector.push(hasTagMatch ? weights.tags : 0);
            console.log(post);

            // Check if the author's skills match the user's skills
            if(post.authorId.skills===null) return vector;
            const authorSkillsMatch = post.authorId.skills.filter(skill => currentUser.skills.includes(skill)).length;
            vector.push(authorSkillsMatch * weights.authorSkills);

            return vector;
        }

        // Get vectors for all posts
        const postVectors = allPosts.map((post) => ({
            post,
            vector: buildPostVector(post),
        }));

        // Calculate similarity scores
        const recommendations = postVectors.map(({ post, vector }) => {
            const similarityScore = vector.reduce((acc, val) => acc + val, 0); // Sum of vector components as a simple score
            return { post, score: similarityScore };
        });

        // Sort posts by similarity score (highest first)
        recommendations.sort((a, b) => b.score - a.score);

        // Take the top 10 recommendations
        const topRecommendations = recommendations.slice(0, 10);

        // Log the recommended posts
        topRecommendations.forEach((rec) => {
            console.log(
                `Recommended Post: ${rec.post.content}, Author: ${rec.post.authorId.username}, Similarity Score: ${rec.score}`
            );
        });

        // Respond with recommended posts
        res.status(200).json({
            topRecommendations: topRecommendations.map((rec) => ({
                _id: rec.post._id,
                content: rec.post.content,
                media: rec.post.media,
                author: {
                    name: rec.post.authorId.fname,
                    profilepic: rec.post.authorId.profilepic,
                },
                tags: rec.post.tags,
                createdAt: rec.post.createdAt,
                likes: rec.post.likes.length,
                comments: rec.post.comments.length,
            })),
        });
    } catch (error) {
        console.error("Error during post recommendation process", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const userPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const posts = await Post.find({ authorId: userId });
        res.status(200).json({ posts: posts });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in user posts: ", err.message);
    }
};

const OtherUserPosts = async (req, res) => {
    try {
        const { userId }= req.body;
        const posts = await Post.find({ authorId: userId });
        res.status(200).json({ posts: posts });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in user posts: ", err.message);
    }
};

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "Logged out Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in logout user: ", err.message);
    }
};

const followUnfollow = async (req, res) => {
    try {
        const { id } = req.params;
        const targetUser = await User.findById(id);
        const currentuser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({
                message: "you cannot follow / unfollow yourself",
            });
        }

        if (!targetUser || !currentuser) {
            return res.status(400).json({ message: "user not found" });
        }

        const isFollowing = currentuser.following.includes(id);

        if (isFollowing) {
            await User.findByIdAndUpdate(currentuser._id, {
                $pull: { following: id },
            });
            await User.findByIdAndUpdate(id, {
                $pull: { followers: currentuser._id },
            });
            return res.status(200).json({ message: "unfollowed successfully" });
        } else {
            await User.findByIdAndUpdate(currentuser._id, {
                $push: { following: id },
            });
            await User.findByIdAndUpdate(id, {
                $push: { followers: currentuser._id },
            });
            return res.status(200).json({ message: "followed successfully" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
        console.log("Error in followUnfollow user: ", err.message);
    }
};

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "profile_pics" },
            (error, result) => {
                if (result) resolve(result.secure_url);
                else reject(error);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const updateUser = async (req, res) => {
    try {
        const {
            bio,
            fieldOfStudy,
            skills,
            interests,
            experiences,
            location,
            social,
        } = req.body;
        const userId = req.user._id;
        const role = req.user.role;
        console.log(req.body);

        let modelName;
        if (role === "alumni") {
            modelName = Alumni;
        } else if (role === "student") {
            modelName = Student;
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        let user = await modelName.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (req.params.id !== userId.toString()) {
            return res
                .status(400)
                .json({ message: "You cannot update other user's profile" });
        }

        let profilepic = user.profilepic;

        if (req.file) {
            if (user.profilepic) {
                const publicId = user.profilepic
                    .split("/")
                    .slice(-2)
                    .join("/")
                    .split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            }
            profilepic = await uploadToCloudinary(req.file.buffer);
            console.log(profilepic);
        }

        user.bio = bio || user.bio;
        user.profilepic = profilepic || user.profilepic;
        user.fieldOfStudy = fieldOfStudy || user.fieldOfStudy;
        user.skills = skills || user.skills;
        user.interests = interests || user.interests;

        if (experiences) {
            user.experiences = experiences.map((exp) => ({
                JobTitle: exp.JobTitle,
                CompanyName: exp.CompanyName,
                Location: exp.Location,
                StartDate: exp.StartDate,
                EndDate: exp.EndDate,
            }));
        }

        if (location) {
            user.Location = {
                City: location.City || user.Location.City,
                State: location.State || user.Location.State,
                Code: location.Code || user.Location.Code,
                Country: location.Country || user.Location.Country,
                Phone: location.Phone || user.Location.Phone,
            };
        }

        user.social = social || user.social;

        user = await user.save();

        res.status(200).json({ message: "Profile updated Successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in update user: ", err.message);
    }
};

const createPost = async (req, res) => {
    try {
        const { content, tags } = req.body;
        console.log(req.body);
        const userId = req.user._id;
        const authorId = userId;
        if (req.file) {
            const media = await uploadToCloudinary(req.file.buffer);
            const post = await Post.create({
                authorId,
                content,
                media,
                tags,
            });
            res.status(201).json({
                message: "Post created successfully",
                post,
            });
        } else {
            const post = await Post.create({
                authorId,
                content,
                tags,
            });
            res.status(201).json({
                message: "Post created successfully",
                post,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in create post: ", err.message);
    }
};

const checkAuth = (req, res) => {
    console.log(req.user);
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
};

const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        let Otp_code = await Otp.findOne({ email: email });
        if (!Otp_code) {
            const otp = crypto.randomInt(100000, 999999).toString();
            const Otp_code = await Otp.create({
                email: user.email,
                otp: otp,
            });
            await sendEmail(user.email, "Verify Email", otp);
        }
        res.status(200).send({ message: "OTP Sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in resend otp: ", error.message);
    }
};

const verifyUser = async (req, res) => {
    try {
        const { role, otp, email } = req.body;
        let modelName;
        if (role === "alumni") {
            modelName = Alumni;
        } else if (role === "student") {
            modelName = Student;
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
        const user = await modelName.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ message: "Invalid User" });
        }
        const Otp_code = await Otp.findOne({
            email: email,
            otp: otp,
        });
        if (!Otp_code) {
            await Otp.deleteOne({ email: email });
            return res.status(400).send({ message: "Invalid Otp" });
        }

        await modelName.findOneAndUpdate(
            { email: email },
            { email_verified: true }
        );

        await Otp.deleteOne({ _id: Otp_code._id });

        res.status(200).send({ message: "email verified succesfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in resend otp: ", error.message);
    }
};

export {
    signupUser,
    loginUser,
    logoutUser,
    followUnfollow,
    updateUser,
    getUserProfile,
    checkAuth,
    verifyUser,
    recommendationSystem,
    createPost,
    recommendPosts,
    userPosts,
    resendOtp,
    OtherUserPosts,
};

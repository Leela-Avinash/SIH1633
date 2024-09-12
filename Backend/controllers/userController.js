import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateToken.js";
import Token from "../models/tokenModel.js";
import sendEmail from "../utils/helpers/sendEmails.js";
import crypto from "crypto";

const getUserProfile = async (req, res) => {
    const { username } = req.params;
    let success = false;
    try {
        const user = await User.findOne({ username })
            .select("-password")
            .select("-updatedAt");

        if (!user) {
            return res.status(400).json({success, message: "User not found" });
        }

        success = true
        res.status(200).json({ success, user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profilepic: user.profilepic,
            followersCount: user.followers.length,
            followingCount: user.following.length,
            bio: user.bio,
            date: user.date,
        } });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in get user: ", err.message);
    }
};

const signupUser = async (req, res) => {
    try {
        console.log(req.body);
        let success = false;
        const { fname, lname, email, username, password } = req.body;

        let userEmail = await User.findOne({ email });
        if (userEmail) {
            return res
                .status(400)
                .json({ success, message: "Email already exists" });
        }

        let userUsername = await User.findOne({ username });
        if (userUsername) {
            return res
                .status(400)
                .json({ success, message: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fname,
            lname,
            username,
            email,
            password: hashedPassword,
        });

        if (user) {
            const token = await Token.create({
                userId: user._id,
                token : crypto.randomBytes(32).toString("hex")
            });

            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;

            await sendEmail(user.email, "Verify Email", url)

            // generateTokenAndSetCookie(user._id, res);
            success = true;

            res.status(201).json({
                success,
                user: {
                    _id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    username: user.username,
                    email: user.email,
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
        const user = await User.findOne(
            isEmail ? { email: identifier } : { username: identifier }
        );

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid Username or Email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        if(!user.verified) {
            let token = await Token.findOne({userId: user._id});
            if(!token) {
                const token = await Token.create({
                    userId: user._id,
                    token : crypto.randomBytes(32).toString("hex")
                });
    
                const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    
                await sendEmail(user.email, "Verify Email", url)
            }
            res.status(400).send({message: "verification Email Sent"})
        }

        generateTokenAndSetCookie(user._id, res);
        console.log("success");
        success = true;
        res.status(201).json({
            success,
            user: {
                id: user._id,
                fname: user.fname,
                username: user.username,
                email: user.email,
                profilepic: user.profilepic,
                followersCount: user.followers.length,
                followingCount: user.following.length,
                bio: user.bio,
                date: user.date,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in login user: ", err.message);
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

const updateUser = async (req, res) => {
    try {
        const { fname, username, email, password, profilepic, bio } = req.body;
        const userId = req.user._id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (req.params.id !== userId.toString()) {
            return res
                .status(400)
                .json({ message: "You cannot update other user's profile" });
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        user.fname = fname || user.fname;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilepic = profilepic || user.profilepic;
        user.bio = bio || user.bio;

        user = await user.save();

        res.status(200).json({ message: "Profile updated Successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in update user: ", err.message);
    }
};

const checkAuth = (req, res) => {
    console.log(req.user);
    res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            fname: req.user.fname,
            username: req.user.username,
            email: req.user.email,
            profilepic: req.user.profilepic,
            followersCount: req.user.followers.length,
            followingCount: req.user.following.length,
            bio: req.user.bio,
            date: req.user.date,
        },
    });
};

const verifyUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        if(!user) {
            return res.status(400).send({message: "Invalid Link"});
        }
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if(!token) {
            return res.status(400).send({message: "Invvalid Link"});
        }

        await User.findOneAndUpdate(
            { _id: user._id },
            { verified: true }
        );
        
        await Token.deleteOne({ _id: token._id });

        res.status(200).send({message: "email verified succesfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in update user: ", error.message);
    }
}

export {
    signupUser,
    loginUser,
    logoutUser,
    followUnfollow,
    updateUser,
    getUserProfile,
    checkAuth,
    verifyUser
};

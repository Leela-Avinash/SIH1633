import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique: true
    },
    otp : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        expires: 600
    },
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
import mongoose from "mongoose";
const ExperienceSchema = mongoose.Schema({
    JobTitle: {
        type: String,
    },
    CompanyName: {
        type: String,
    },
    Location: {
        type: String,
    },
    StartDate: {
        type: Date,
    },
    EndDate: {
        type: Date,
    },
}, { _id: false });
const LocationSchema = mongoose.Schema({
    City: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    Code: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
}, { _id: false }
);
const SocialSchema = mongoose.Schema({
    linkedinProfile: {
        type: String,
    },
    githubProfile: {
        type: String,
    },
    websiteURL: {
        type: String,
    },
}, { _id: false }
);
const AlumniSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    degree: {
        type: String,
        required: true,
    },
    gyear: {
        type: Number,
        required: true,
    },
    gmonth: {
        type: String,
        required: true
    },
    rollnumber: {
        type: String,
        reuired: true
    },
    document_verification: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now,
    },
    profileImg: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
    },
    interests: {
        type: [String],
    },
    fieldOfStudy: {
        type: String,
    },
    Experience: {
        type: [ExperienceSchema],
    },
    Location: {
        type: LocationSchema,
    },
    Social: {
        type: SocialSchema,
    },

}, {
    timeStamps: true,
})

const Alumni = mongoose.model("Alumni", AlumniSchema);
export default Alumni;

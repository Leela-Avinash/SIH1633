import mongoose from "mongoose";

const AlumniSchema=mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    collegeName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
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
    }
},{
    timeStamps:true,
})

const Alumni=mongoose.model("Alumni",AlumniSchema);
export default Alumni;
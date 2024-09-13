import mongoose from "mongoose";

const StudentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    clgName:{
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
    date: {
        type: Date,
        default: Date.now,
    }
},{
    timeStamps:true,
})

const Student=mongoose.model("Student",StudentSchema);
export default Student;
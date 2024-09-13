import mongoose from "mongoose";

const AlumniSchema=mongoose.Schema({
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
    }
},{
    timeStamps:true,
})

const Alumni=mongoose.model("Alumni",AlumniSchema);
export default Alumni;
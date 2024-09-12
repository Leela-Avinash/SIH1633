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
    clgEmail:{
        type:String,
        required:true
    }
    
},{
    timeStamps:true,
})

const Alumni=mongoose.model("Alumni",AlumniSchema);
export default Alumni;
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
    clgEmail:{
        type:String,
        required:true
    }
    
},{
    timeStamps:true,
})

const Student=mongoose.model("Student",StudentSchema);
export default Student;
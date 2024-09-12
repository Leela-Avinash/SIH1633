import RegistrationForm from "./RegistrationForm"
const AlumniReg=()=>{
    return(
        <div className="h-screen flex justify-center items-center ">
            <div className="w-1/3">
            <h1 className="text-3xl font-bold text-blue-500 py-6">Register as Alumni</h1>
            <RegistrationForm/>
            </div>
        </div>
    )
}
export default AlumniReg;
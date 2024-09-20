import React from "react";
import LandingPage from "./pages/Landingpage.jsx";
import GetStarted from "./pages/GetStarted.jsx";
// import RegistrationForm from "./pages/RegistrationForm.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentReg from "./pages/StudentReg.jsx";
import AlumniReg from "./pages/AlumniReg.jsx";
import EmailVerify from "./pages/emailverify.jsx";
import Login from "./pages/Loginpage.jsx";
import AlumniDocumentVerification from "./pages/doc_AI_verification.jsx";

const App = () => {
    return (
        <div className="bg-gradient-to-b from-bgcol1 via-bgcol2 to-bgcol3 h-screen w-full">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/getstarted" element={<GetStarted />} />
                    <Route path="/stusignup" element={<StudentReg />} />
                    <Route path="/alusignup" element={<AlumniReg />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/Doc_AI" element={<AlumniDocumentVerification />} />
                    <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;

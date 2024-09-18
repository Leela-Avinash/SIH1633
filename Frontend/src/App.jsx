import React from "react";
import LandingPage from "./pages/Landingpage.jsx";
import GetStarted from "./pages/GetStarted.jsx";
// import RegistrationForm from "./pages/RegistrationForm.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailVerify from "./pages/emailverify.jsx";
import DocUpload from "./pages/docUpload.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Dashboard from "./pages/dashBoard.jsx";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/getstarted" element={<GetStarted />} />
                    <Route path="/:role/signup" element={<Registration />} />
                    <Route path="/users/:role/:id/verify/:token" element={<EmailVerify />} />
                    <Route path="/docai" element={<DocUpload/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;

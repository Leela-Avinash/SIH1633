import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice.js";
import { setAuth } from "./redux/slices/authSlice.js";
import LandingPage from "./pages/Landingpage.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmailVerify from "./pages/emailverify.jsx";
import DocUpload from "./pages/docUpload.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Dashboard from "./pages/dashBoard.jsx";

const App = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);
    const [documentVerified, setDocumentVerified] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/users/check-auth",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const json = await response.json();
                console.log(json);
                if (json.success) {
                    localStorage.setItem("user", JSON.stringify(json.user));
                    dispatch(setUser(json.user));
                    dispatch(setAuth(true));

                    const storedUser = JSON.parse(localStorage.getItem("user"));
                    if (storedUser && storedUser.document_verification) {
                        setDocumentVerified(storedUser.document_verification);
                    }
                }
            } catch (error) {
                console.log("Error checking auth", error);
            }
        };

        checkAuth();
    }, [dispatch]);
    console.log(user);
    console.log(documentVerified)
    console.log(isAuthenticated)
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element= {<LandingPage />} />
                    <Route path="/getstarted" element={isAuthenticated? (documentVerified? <Navigate to="/dashboard" /> : <Navigate to="/docai"/>): <GetStarted />} />
                    <Route path="/:role/signup" element={isAuthenticated? (documentVerified? <Navigate to="/dashboard" /> : <Navigate to="/docai"/>) : <Registration />} />
                    <Route path="/users/:role/:id/verify/:token" element={<EmailVerify />} />
                    <Route path="/docai" element={<DocUpload/>}/>
                    <Route path="/login" element={isAuthenticated ? (documentVerified? <Navigate to="/dashboard" /> : <Navigate to="/docai"/>) : <Login/>}/>
                    <Route path="/dashboard" element={!isAuthenticated ? <Navigate to='/'/> : (documentVerified? <Dashboard /> : <Navigate to="/docai"/>)} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                </Routes>
            </Router>
        </div>
    );
};

export default App;

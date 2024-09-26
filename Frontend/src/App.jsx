import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice.js";
// import React, { useState } from "react";
import { setAuth,setDoc } from "./redux/slices/authSlice.js";
import LandingPage from "./pages/Landingpage.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmailVerify from "./pages/emailverify.jsx";
import DocUpload from "./pages/docUpload.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
// import Dashboard from "./pages/dashBoard.jsx";
import MainPage from "./pages/MainPage.jsx";
import ProfilePage from "./components/profilePage.jsx";
import ProfileCompletionForm from "./pages/ProfileCompletionForm.jsx";
import Profile from "./pages/Profile.jsx";
import Network from "./components/networkSection.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import Chatbot from "./components/Chatbot.jsx";
const App = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { isDocVerified } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);
    const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

    const users = [
        {
          id: 1,
          name: 'John Doe',
          jobTitle: 'Software Engineer',
          profilePicture: 'https://via.placeholder.com/150',
          skills: ['JavaScript', 'React', 'Node.js'],
        },
        {
          id: 2,
          name: 'Jane Smith',
          jobTitle: 'Data Scientist',
          profilePicture: 'https://via.placeholder.com/150',
          skills: ['Python', 'Machine Learning', 'AI'],
        },
        {
          id: 3,
          name: 'Mike Johnson',
          jobTitle: 'Product Manager',
          profilePicture: 'https://via.placeholder.com/150',
          skills: ['Leadership', 'Agile', 'Scrum'],
        },
        // Add more users...
      ];

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

                    const storedUser = await JSON.parse(localStorage.getItem("user"));
                    if (storedUser && storedUser.document_verification) {
                        dispatch(setDoc(storedUser.document_verification))
                    }
                }
            } catch (error) {
                console.log("Error checking auth", error);
            }
        };

        checkAuth();
    }, [dispatch]);

    return (
        <div className="">
            <Router>
                <Routes>
                    <Route path="/" element= {<LandingPage />} />
                    <Route path="/getstarted" element={<GetStarted />} />
                    <Route path="/:role/signup" element={<Registration />} />
                    <Route path="/users/:role/:id/verify/:token" element={<EmailVerify />} />
                    <Route path="/docai" element={isAuthenticated ? (isDocVerified? <Navigate to="/dashboard" />: <DocUpload/>):<Navigate to="/login"/>}/>
                    <Route path="/login" element={ <Login/>}/>
                    <Route path="/dashboard" element={isAuthenticated ? (isDocVerified ? <MainPage/> : <Navigate to="/docai" />) : <Navigate to="/login" />} />
                    <Route path="/profile/:username" element={<Profile/> } />
                    <Route path="/profilecompletion" element={<ProfileCompletionForm/>}/>
                    <Route path="/network" element={<Network/>}/>
                    {/* <Route path="/login" element={<Login/>}/> */}
                    <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to={"/login"}/>} />
                </Routes>
                <button className="fixed bottom-3 left-5 p-4 rounded-full text-white focus:outline-none z-50"
          onClick={handleToggleChat}
        >
          <img src="../chatbot1.gif" className="w-20 h-20"></img>
        </button>
        <Chatbot isOpen={isChatOpen} handleToggle={handleToggleChat} />
            </Router>
        </div>
    );
};

export default App;
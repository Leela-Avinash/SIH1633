import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MyProfilePage from "../components/myProfilePage";
import ProfilePage from "../components/profilePage";
import Navbar from "../components/navBar"; // Assuming Navbar component exists
import Sidebar from "../components/Sidebar"; // Assuming Sidebar component exists
import LeaderBoard from "../components/LeaderBoard"; // Assuming LeaderBoard component exists
import Suggestions from "../components/Suggestions"; // Assuming Suggestions component exists

const Profile = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const { username } = useParams();
    const host = "http://localhost:5000";
    
    const [activePage, setActivePage] = useState("otherprofile");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    const handleNavClick = (page) => {
        setActivePage(page);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!username) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${host}/api/users/profile/${username}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    console.error(`Error: ${response.statusText}`);
                    setLoading(false);
                    return;
                }

                const json = await response.json();
                if (json.success) {
                    setUserData(json.user);
                } else {
                    console.error("Failed to fetch user profile: ", json.message);
                }
            } catch (error) {
                console.error("Error fetching user profile", error);
            }

            setLoading(false);
        };

        fetchUserProfile();
    }, [username]);

    useEffect(() => {
        // Navigate to dashboard if the active page is not "otherprofile"
        if (activePage !== "otherprofile") {
            navigate("/dashboard");
        }
    }, [activePage, navigate]);

    const formatDate = (isoString) => {
        if (!isoString) return "Present";
        const dateObj = new Date(isoString);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString("default", { month: "short" });
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-row bg-gray-50">
            {/* Navbar Component */}
            <Navbar onNavClick={handleNavClick} activePage={activePage} />

            <div className="flex w-full">
                {/* Sidebar Component */}
                <Sidebar onNavClick={handleNavClick} activePage={activePage} />

                <div className="mt-20 ml-52 w-3/4">
                    {/* Conditional Rendering for Profile Pages */}
                    {(!username || user.username === username) ? (
                        <MyProfilePage />
                    ) : (
                        <ProfilePage user={userData} />
                    )}
                </div>

                {/* Right Sidebar: Leaderboard and Suggestions */}
                <div className="flex flex-col">
                    <div>
                        <LeaderBoard />
                    </div>
                    <div className="w-96 mr-5">
                        <Suggestions />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MyProfilePage from "../components/myProfilePage";
import ProfilePage from "../components/profilePage";

const Profile = () => {
    const user = useSelector((state) => state.user);
    const { username } = useParams();
    const host = "http://localhost:5000";
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (username) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(
                        `${host}/api/users/profile/${username}`,
                        {
                            method: "GET",
                            credentials: "include",
                        }
                    );
                    const json = await response.json();
                    if (json.success) {
                        setUserData(json.user);
                    } else {
                        console.log("bla bla bla");
                    }
                } catch (error) {
                    console.error("Error fetching user profile", error);
                }
            };
            fetchUserProfile();
        }
    }, [username]);
    console.log(userData);

    const formatDate = (isoString) => {
        if (!isoString) return "Present";

        const dateObj = new Date(isoString);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString("default", { month: "short" });
        const year = dateObj.getFullYear();

        return `${day}-${month}-${year}`;
    };
    return !username || user.username === username ? (
        <MyProfilePage formatDate={formatDate} />
    ) : (
        <ProfilePage formatDate={formatDate} user={userData} />
    );
};

export default Profile;

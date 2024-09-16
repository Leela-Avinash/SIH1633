import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:5000/api/users/${param.role}/${param.id}/verify/${param.token}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(response);
                if (response.status == 200){
                    setValidUrl(true);
                }
            } catch (error) {
                
            }
        };
        verifyEmailUrl();
    }, [param])
    return (
        <div>
            {validUrl ? 
            (
                <div>
                    <h1>Verified Succesfully</h1>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            ):(
                <h1>404 Not Found</h1>
            )}
        </div>
    )
}

export default EmailVerify;
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId,role, res) => {
    console.log(role);
    const token = jwt.sign({ userId,role}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict', 
    });
    
    return token;
}

export default generateTokenAndSetCookie;
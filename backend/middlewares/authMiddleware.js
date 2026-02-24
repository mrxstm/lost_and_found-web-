import jwt from "jsonwebtoken"

export const isAuthenticated = (req,res,next) => {
    try {
        const token = req.cookies.access_token;
    

        if(!token) {
            return res.status(401).json({message: "Not logged in"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            college_id : decoded.college_id
        };

        next();

    } catch(err) {
        return res.status(401).json({message: "Invalid or expired token"});
    }
}
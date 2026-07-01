import jwt from "jsonwebtoken"

const adminAuth = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({success:false,message:"Not Authorized Login Again"})
    }

    try {
        const token = authHeader.split(" ")[1];
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        if (token_decode.role !== "admin") {
            return res.status(403).json({success:false,message:"Admin access required"})
        }

        req.admin = {
            email: token_decode.email,
            role: token_decode.role
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({success:false,message:"Error"})
    }
}

export default adminAuth;

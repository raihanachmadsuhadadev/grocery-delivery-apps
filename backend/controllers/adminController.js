import jwt from "jsonwebtoken"

const loginAdmin = async (req,res) => {
    const {email,password} = req.body;

    try {
        const requestEmail = email?.trim();
        const adminEmail = process.env.ADMIN_EMAIL?.trim();
        const adminPassword = process.env.ADMIN_PASSWORD?.trim();

        if (!adminEmail || !adminPassword || !process.env.JWT_SECRET) {
            return res.status(500).json({success:false,message:"Admin auth is not configured"})
        }

        if (requestEmail !== adminEmail || password !== adminPassword) {
            return res.status(401).json({success:false,message:"Invalid admin credentials"})
        }

        const token = jwt.sign({role:"admin",email:requestEmail},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Error"})
    }
}

export {loginAdmin}

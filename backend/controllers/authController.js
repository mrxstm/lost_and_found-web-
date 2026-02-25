import { College } from "../models/collegeModel.js";
import { Users } from "../models/association.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwt-utils.js";
import bcrypt from "bcrypt";



export const register = async (req, res) => {
   
    try {
    
        const { fullname, username, email, password, phone_no, gender, college } = req.body;

        // invalid or empty fields

        if (!fullname || fullname.trim() === "") return res.status(400).json({message:"Fullname is required"});


        // username validation
        if (!username || username.trim() === "") return res.status(400).json({message:"Username is required"});

        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
         return res.status(400).json({ message: "Username must be 3-20 chars, letters, numbers, or underscore" });
        }


        if (!email || email.trim() === "") return res.status(400).json({message:"Email is required"});
        
        // email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        
        if (!password || password.trim() === "") return res.status(400).json({message:"Password is required"});
        // if (!c_password || c_password.trim() === "") return res.status(400).json({message:"Confirm password is required"});

        //password length and contains upper lower special character and number validation 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            message: "Password must be 8+ chars, include uppercase, lowercase, number & special char" 
        });
        }


        // check if password and confirm password fields match
        // if (password !== c_password) return res.status(400).json({message:"Passwords do not match"});


        if (!phone_no || phone_no.trim() === "") return res.status(400).json({message:"Phone number is required"});

        //number validation (should have 10 digits and starts with 98 97)
        const numberRegex = /^9[87]\d{8}$/;
        if (!numberRegex.test(phone_no)) {
        return res.status(400).json({ message: "Invalid phone number format" });
        }

        if (!gender || gender.trim() === "") return res.status(400).json({message:"Gender is required"});

        //College field validation
        if (!college || college.trim() === "") return res.status(400).json({message:"College is required"});

        // email already registered

        const existingUser = await Users.findOne({where: {email}});
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        //College id validation
        const selectedCollege = await College.findOne({where: {name : college}});
        if (!selectedCollege) return res.status(400).json({ message: "Invalid College selected" });

        const college_id = selectedCollege.id;
        
        const existingPhone = await Users.findOne({where: {phone_no}});
        if(existingPhone) {
            return res.status(400).json({ message: "Phone number already registered" });
        }

        // password hash using bcrypt
        const password_hash = await hashPassword(password)      

        const user = await Users.create({
            fullname, 
            username, 
            email, 
            password_hash, 
            phone_no, 
            gender, 
            college_id
        });
        res.status(201).json({message: "User registration successful"})


        
    } catch(e) {
        res.status(500).json({message:e.message})
    }
}

export const login = async(req,res) => {

    try 
   { 
    const body = req.body;

        if (!body.email || body.email.trim() === "") return res.status(400).json({message:"Email is required"});

        // email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        if (!body.password || body.password.trim() === "") return res.status(400).json({message:"Password is required"});
      
        const user = await Users.findOne({where:{email:body.email}});

        if(!user) {
            res.status(404).json({message:"User not found"});
            return;
        }

        const isMatch = await bcrypt.compare(body.password, user.password_hash);

        if(!isMatch) {
            return res.status(400).json({message: "Password is incorrect"});
        }

        //token generation
        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role, 
            college_id : user.college_id
        });


        // set cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(200).json({message: "Login successful", 
        user: {
            id:user.id,  
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            college_id: user.college_id
        }});
        console.log(user);
        
    } catch(error) {
        
        res.status(500).json({message: "Server error"})        
    }

}

export const logout = (req,res) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })

        return res.status(200).json({message: "Logged out successfully"});
    } catch(e) {
        res.status(500).json({message: e.message});
    }
}
import { Op } from "sequelize";
import { College, Item, Users } from "../models/association.js";


export const getAllUser = async (req,res) => {
    try {
        const users = await Users.findAll();
        res.status(400).json({data: users , message : "Users fetched successfully" })
    } catch(e) {
        res.status(500).json(e.message)
    }
}

export const getMe = async (req,res) => {

    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "fullname", "email", "role", "profile_pic_url", "phone_no", "gender"],
            include : [
                {
                    model : College,
                    attributes: ['name']
                }
            ]
        });
        if(!user) {
            res.status(404).json({message : "User not found in table"});
            return;
        }
        res.status(200).json({data: user, message: "User fetched successfully"})
        
    } catch(e) {
        res.status(500).json({ message: e.message });   
    }

}


export const save = async(req,res) => {
    const body = req.body
    console.log(body);
    try{
        const users = await Users.create(body);
        res.status(200).json({data: users, message: "Data saved successfully"});
    } catch(err) {
        res.status(500).json({ message: e.message });
    }
}

export const updateUserById = async (req,res) => {
    try {
        const {id = null} = req.params;
        const body = req.body;
        const user = await Users.findOne({where:{id}})

        if(!user) {
            res.status(500).json({message: "User not found"});
            return;
        }

        await user.update(req.body);
        await user.save();
        res.status(200).json({message: "Data updated successfully"})


    } catch(e) {
        res.status(500).json({ message: e.message });    
    }
}


export const deleteUserById = async(req,res) => {
    try {
        const {id=null} = req.params;
        const user = await Users.findOne({where : {id}})

        
        if(!user) {
            res.status(500).json({message: "User not found"});
            return;
        }



        await user.destroy();
        res.status(200).json({message: "Data deleted successfully"})
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
}

export const getUserProfileStat = async (req, res) => {
    console.log("REQ.USER:", req.user);

  try {
    const user_id = req.user.id;

    const totalReports = await Item.count({
      where: { reported_by: user_id }
    });

    const foundItem = await Item.count({
      where: { reported_by: user_id, status: "found" }
    });

    const lostItem = await Item.count({
      where: { reported_by: user_id, status: "lost" }
    });

    const resolvedItems = await Item.count({
      where: { reported_by: user_id, status: "claimed" } 
    });

    const successRate =
      totalReports === 0
        ? 0
        : Math.round((resolvedItems / totalReports) * 100);

    res.status(200).json({
      totalReports,
      foundItem,
      lostItem,
      successRate
    });

  } catch (error) {
    console.error(error); 
    res.status(500).json({
      message: "Failed to load profile stats",
      error
    });
  }
};


export const editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullname, email, phone_no, gender } = req.body;

    // Find user first
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ---------------- VALIDATION ----------------

    if (fullname !== undefined) {
      if (fullname.trim() === "")
        return res.status(400).json({ message: "Fullname cannot be empty" });

      if (fullname.length < 3)
        return res.status(400).json({ message: "Fullname must be at least 3 characters" });

      if (!/^[A-Za-z\s]+$/.test(fullname))
        return res.status(400).json({ message: "Fullname can only contain letters" });
    }

    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email))
        return res.status(400).json({ message: "Invalid email format" });

      const existingEmail = await Users.findOne({
        where: { email, id: { [Op.ne]: userId } }
      });

      if (existingEmail)
        return res.status(400).json({ message: "Email already in use" });
    }

    if (phone_no !== undefined) {
      const phoneRegex = /^(97|98)[0-9]{8}$/;

      if (!phoneRegex.test(phone_no))
        return res.status(400).json({ message: "Invalid phone number format" });

      const existingPhone = await Users.findOne({
        where: { phone_no, id: { [Op.ne]: userId } }
      });

      if (existingPhone)
        return res.status(400).json({ message: "Phone number already in use" });
    }

    if (gender !== undefined) {
      if (!["male", "female", "other"].includes(gender))
        return res.status(400).json({ message: "Invalid gender selected" });
    }


    let profile_pic_url = user.profile_pic_url; // keep old by default

    if (req.file) {
      profile_pic_url = `/uploads/profiles/${req.file.filename}`;
    }

    

    const updateFields = {};

    if (fullname !== undefined) updateFields.fullname = fullname;
    if (email !== undefined) updateFields.email = email;
    if (phone_no !== undefined) updateFields.phone_no = phone_no;
    if (gender !== undefined) updateFields.gender = gender;

    if (req.file) {
      updateFields.profile_pic_url = `/uploads/profiles/${req.file.filename}`;
    }

    await user.update(updateFields);

    // Fetch updated user with college
    const updatedUser = await Users.findByPk(userId, {
      attributes: [
        "id",
        "fullname",
        "email",
        "phone_no",
        "gender",
        "role",
        "profile_pic_url"
      ],
      include: [
        {
          model: College,
          attributes: ["name"]
        }
      ]
    });

    return res.status(200).json({
      data: { user: updatedUser },
      message: "Profile updated successfully"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id; 

    await Users.destroy({
      where: { id: userId }
    });

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete account" });
  }
};
import bcrypt from "bcrypt";
import { Users } from "../models/association.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: [
        
        "id",
        "fullname",
        "username",
        "email",
        "phone_no",
        "gender",
        "college_id",
      ]
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// async function createAdmin() {
//     const hashedPassword = await bcrypt.hash("admin123", 10);

//     await Users.create({
//         fullname: "Admin User",
//         username: "admin",
//         email: "admin@example.com",
//         password_hash: hashedPassword,
//         phone_no: "9851017864",
//         gender: "male",
//         profile_pic_url: "",
//         collage: "Softwarica",
//         role: "admin"
//     });

//     console.log("Admin user created");
// }



// createAdmin();

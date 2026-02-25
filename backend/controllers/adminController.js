import { Users, Item, Location, Claim } from "../models/association.js";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { Op } from "sequelize";



export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: { college_id: req.user.college_id, id: { [Op.ne]: req.user.id }  },
            attributes: ["id", "fullname", "username", "email", "phone_no", "gender", "college_id"]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPendingItems = async (req, res) => {
    try {
        const items = await Item.findAll({
            where: {
                isApproved: false,
                college_id: req.user.college_id 
            },
            include: [
                { model: Location, attributes: ["id", "name"] },
                { model: Users, as: "reporter", attributes: ["id", "fullname", "email"] }
            ],
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json({ data: items, message: "Pending items fetched" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const approveItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findOne({
            where: {
                id,
                college_id: req.user.college_id  
            }
        });

        if (!item) return res.status(404).json({ message: "Item not found" });

        await item.update({ isApproved: true });
        res.status(200).json({ message: "Item approved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const rejectItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findOne({
            where: {
                id,
                college_id: req.user.college_id  
            }
        });

        if (!item) return res.status(404).json({ message: "Item not found" });

        if (item.image_urls && item.image_urls.length > 0) {
            item.image_urls.forEach((imgPath) => {
                const fullPath = path.join(process.cwd(), imgPath);
                if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
            });
        }

        await item.destroy();
        res.status(200).json({ message: "Item rejected and deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findOne({
            where: {
                id,
                college_id: req.user.college_id  
            }
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.findAll({
            include: [
                {
                    model: Item,
                    where: { college_id: req.user.college_id },  // college specific
                    attributes: ["id", "itemName", "status"]
                },
                {
                    model: Users,
                    as: "claimant",
                    attributes: ["id", "fullname", "email"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json({ data: claims, message: "Claims fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const adminDeleteClaim = async (req, res) => {
    try {
        const { id } = req.params;
        const claim = await Claim.findOne({
            where: { id },
            include: [{
                model: Item,
                where: { college_id: req.user.college_id }
            }]
        });

        if (!claim) return res.status(404).json({ message: "Claim not found" });

        // delete proof image from disk if exists
        if (claim.proof_image) {
            const fullPath = path.join(process.cwd(), claim.proof_image);
            if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }

        await claim.destroy();
        res.status(200).json({ message: "Claim deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// async function createAdmin() {
//     const hashedPassword = await bcrypt.hash("admin123", 10);

//     await Users.create({
//         fullname: "Herald Admin",
//         username: "Herald Admin",
//         email: "heraldadmin@example.com",
//         password_hash: hashedPassword,
//         phone_no: "9841404242",
//         gender: "male",
//         profile_pic_url: "",
//         college_id: 2,
//         role: "admin"
//     });

//     console.log("Admin user created");
// }



// createAdmin();

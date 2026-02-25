import { College } from "../models/association.js";

export const getAllColleges = async (req, res) => {
    try {
        const colleges = await College.findAll({
            attributes: ["id", "name"],
            order: [["name", "ASC"]]
        });
        res.status(200).json({ data: colleges, message: "Colleges fetched successfully" });
    } catch (error) {
        console.error("College fetch error:", error);
        res.status(500).json({ message: "Failed to fetch colleges" });
    }
};
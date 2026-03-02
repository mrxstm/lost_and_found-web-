import { Item, Users } from "../models/association.js";
import { Op } from "sequelize";

export const getPlatformStats = async (req, res) => {
    try {
        // Total reports (lost + found items)
        const totalReports = await Item.count({
            where: { status: ["lost", "found", "claimed"] }
        });

        // Items returned (claimed)
        const itemsReturned = await Item.count({
            where: { status: "claimed" }
        });

        // Active users (users who have reported at least one item)
        const activeUsers = await Users.count({
            where: {
                id: {
                    [Op.in]: await Item.findAll({
                        attributes: ["reported_by"],
                        group: ["reported_by"]
                    }).then(items => items.map(i => i.reported_by))
                }
            }
        });

        // Avg response time in hours (time between item creation and it being claimed)
        const claimedItems = await Item.findAll({
            where: { status: "claimed" },
            attributes: ["createdAt", "updatedAt"]
        });

        let avgResponseHours = 0;
        if (claimedItems.length > 0) {
            const totalHours = claimedItems.reduce((sum, item) => {
                const diff = new Date(item.updatedAt) - new Date(item.createdAt);
                return sum + diff / (1000 * 60 * 60); // ms to hours
            }, 0);
            avgResponseHours = Math.round(totalHours / claimedItems.length);
        }

        res.status(200).json({
            data: {
                totalReports,
                itemsReturned,
                activeUsers,
                avgResponseHours
            },
            message: "Stats fetched successfully"
        });

    } catch (error) {
        console.error("Stats error:", error);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
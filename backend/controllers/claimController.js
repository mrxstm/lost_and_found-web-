import { Claim, Item, Users } from "../models/association.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const submitClaim = async (req, res) => {
    try {
        const claimant_id = req.user.id;
        const { item_id, message } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({ message: "Message is required" });
        }

        const item = await Item.findOne({ where: { id: item_id } });

        if (!item) return res.status(404).json({ message: "Item not found" });

        if (item.reported_by === claimant_id) {
            return res.status(403).json({ message: "You cannot claim your own item" });
        }

        if (item.status === "claimed") {
            return res.status(400).json({ message: "This item has already been claimed" });
        }

        // ✅ removed — lost items can now be claimed via "I Found This Item"

        const existingClaim = await Claim.findOne({ where: { item_id, claimant_id } });
        if (existingClaim) {
            return res.status(400).json({ message: "You have already submitted a claim for this item" });
        }

        const proof_image = req.file ? `/uploads/proofs/${req.file.filename}` : null;

        const claim = await Claim.create({
            item_id,
            claimant_id,
            message,
            proof_image,
            status: "pending"
        });

        res.status(201).json({ data: claim, message: "Claim submitted successfully" });

    } catch (error) {
        console.error("Submit claim error:", error);
        res.status(500).json({ message: "Failed to submit claim" });
    }
};

// Get claims on my reported items (for finder)
export const getClaimsOnMyItems = async (req, res) => {
    try {
        const finder_id = req.user.id;

        const claims = await Claim.findAll({
            include: [
                {
                    model: Item,
                    where: { reported_by: finder_id },
                    attributes: ["id", "itemName", "status"]
                },
                {
                    model: Users,
                    as: "claimant",
                    attributes: ["id", "fullname", "email", "phone_no"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ data: claims, message: "Claims fetched successfully" });
    } catch (error) {
        console.error("Get claims error:", error);
        res.status(500).json({ message: "Failed to fetch claims" });
    }
};

// Get my submitted claims (for claimant)
export const getMyClaims = async (req, res) => {
    try {
        const claimant_id = req.user.id;

        const claims = await Claim.findAll({
            where: { claimant_id },
            include: [
                {
                    model: Item,
                    attributes: ["id", "itemName", "status"],
                    include: [
                        {
                            model: Users,
                            as: "reporter",
                            attributes: ["id", "fullname", "email", "phone_no"]
                        }
                    ]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ data: claims, message: "Claims fetched successfully" });
    } catch (error) {
        console.error("Get my claims error:", error);
        res.status(500).json({ message: "Failed to fetch claims" });
    }
};

// Approve a claim (finder only)
export const approveClaim = async (req, res) => {
    try {
        const { id } = req.params;
        const finder_id = req.user.id;

        const claim = await Claim.findOne({
            where: { id },
            include: [{ model: Item }]
        });

        if (!claim) return res.status(404).json({ message: "Claim not found" });

        // only the finder (reporter) can approve
        if (claim.Item.reported_by !== finder_id) {
            return res.status(403).json({ message: "You are not authorized to approve this claim" });
        }

        // approve this claim
        await claim.update({ status: "approved" });

        // update item status to claimed
        await claim.Item.update({ status: "claimed" });

        // reject all other pending claims for this item
        await Claim.update(
            { status: "rejected" },
            { where: { item_id: claim.item_id, id: { [Op.ne]: id }, status: "pending" } }
        );

        res.status(200).json({ message: "Claim approved successfully" });

    } catch (error) {
        console.error("Approve claim error:", error);
        res.status(500).json({ message: "Failed to approve claim" });
    }
};

// Reject a claim (finder only)
export const rejectClaim = async (req, res) => {
    try {
        const { id } = req.params;
        const finder_id = req.user.id;

        const claim = await Claim.findOne({
            where: { id },
            include: [{ model: Item }]
        });

        if (!claim) return res.status(404).json({ message: "Claim not found" });

        if (claim.Item.reported_by !== finder_id) {
            return res.status(403).json({ message: "You are not authorized to reject this claim" });
        }

        await claim.update({ status: "rejected" });

        res.status(200).json({ message: "Claim rejected" });

    } catch (error) {
        console.error("Reject claim error:", error);
        res.status(500).json({ message: "Failed to reject claim" });
    }
};

// Get contact details (only if claim is approved)
export const getContactDetails = async (req, res) => {
    try {
        const { item_id } = req.params;
        const claimant_id = req.user.id;

        const claim = await Claim.findOne({
            where: { item_id, claimant_id, status: "approved" },
            include: [
                {
                    model: Item,
                    include: [
                        {
                            model: Users,
                            as: "reporter",
                            attributes: ["fullname", "email", "phone_no"]
                        }
                    ]
                }
            ]
        });

        if (!claim) {
            return res.status(403).json({ message: "No approved claim found for this item" });
        }

        res.status(200).json({
            data: {
                fullname: claim.Item.reporter.fullname,
                email: claim.Item.reporter.email,
                phone_no: claim.Item.reporter.phone_no
            },
            message: "Contact details fetched"
        });

    } catch (error) {
        console.error("Get contact error:", error);
        res.status(500).json({ message: "Failed to fetch contact details" });
    }
};
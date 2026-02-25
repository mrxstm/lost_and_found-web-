import { Location } from "../models/association.js";

export const fetchLocations = async (req, res) => {
    try {
        const college_id = req.user.college_id;
        const locations = await Location.findAll({
            where: { college_id },
            order: [["name", "ASC"]]
        });
        if (locations.length === 0) {
            return res.status(404).send({ message: "No location found" });
        }
        return res.status(200).send({ message: "Locations fetched", locations });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error", error });
    }
};

export const addLocation = async (req, res) => {
    try {
        const college_id = req.user.college_id;
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Location name is required" });
        }

        // check duplicate within same college
        const existing = await Location.findOne({ where: { college_id, name: name.trim() } });
        if (existing) {
            return res.status(400).json({ message: "Location already exists for this college" });
        }

        const location = await Location.create({ college_id, name: name.trim() });
        res.status(201).json({ data: location, message: "Location added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const college_id = req.user.college_id;
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Location name is required" });
        }

        const location = await Location.findOne({ where: { id, college_id } });
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        // check duplicate
        const existing = await Location.findOne({ where: { college_id, name: name.trim() } });
        if (existing && existing.id !== Number(id)) {
            return res.status(400).json({ message: "Location name already exists" });
        }

        await location.update({ name: name.trim() });
        res.status(200).json({ data: location, message: "Location updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const college_id = req.user.college_id;

        const location = await Location.findOne({ where: { id, college_id } });
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        await location.destroy();
        res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
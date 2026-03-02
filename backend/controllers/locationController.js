import { Location } from "../models/association.js";

export const fetchLocations = async(req,res) => {
    try {
        const college_id = req.user.college_id
        const locations = await Location.findAll({
            where:{college_id},
            order: [["name", "ASC"]]
        });
        if(locations.length === 0) {
            return res.status(404).send({message: "No location found"});
        }

        return res.status(200).send({message: "Locations fetched", locations});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Server error :  ", error});
    }
}
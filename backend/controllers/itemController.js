import { Op } from "sequelize";
import { Item, Location, Users } from "../models/association.js";

export const getAllItem = async (req,res) => {
    try {
        const user_id = req.user.id;
        
        const items = await Item.findAll({
            where: {
                reported_by: {[Op.ne]: user_id}, // exclude current user's reports (ne means not equal)
                status: ["lost", "found"],
                college_id: req.user.college_id
            },
            order: [["createdAt", "DESC"]],
            include: [
                {model : Location}
            ]
        })
        res.status(200).send({data: items, message: "Items fetched successfully"})
    } catch(e) {
        res.status(500).send(e.message);
    }
}

export const getItemById = async (req,res) => {
    try {
    
        const {id} = req.params;
        const college_id = req.user.college_id;
        console.log(college_id);
        

        const item = await Item.findOne({
            where: {
                id,
                college_id: college_id
            },
            include: [
                { model: Location },
                {model : Users, as: "reporter"}
            ]
        })
        if(!item) {
            res.status(404).send("Item not found")
            return
        }
          
        // Count total items reported by this user
        const itemsReported = await Item.count({ where: { reported_by: item.reporter.id } });

        // Count items returned (status = 'claimed')
        const itemsReturned = await Item.count({ where: { reported_by: item.reporter.id, status: 'claimed' } });

        res.status(200).send({data: item, stats: {itemsReported, itemsReturned}, message: "Items fetched successfully"})
    } catch(e) {
        console.log(e);
        res.status(500).send(e.message);
    }
}



export const getItemByStatus = async (req,res) => {
    try {
        const {status} = req.params;
        const user_id = req.user.id;

        if (!["lost", "found"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const items = await Item.findAll({
            where: {
                status,
                reported_by: user_id
            },
            include: [
                {
                    model: Location,
                    attributes: ["id", "name"]
                }
            ],
            order: [["createdAt", "DESC"]]
        })
        res.status(200).send({data: items, message: "Items fetched successfully"})
    } catch(e) {
        res.status(500).send(e.message);
    }
}
export const updateItemById = async (req,res) => {
    try {
        const body = req.body
        const {id} = req.params
        const item = await Item.findOne({where: {id}})

        if(!item) {
            res.status(404).send("Item not found")
            return
        }

        await item.update(body);

        res.status(200).send({data: item, message: "Item updated successfully"})
    } catch(e) {
        res.status(500).send(e.message);
    }
}
export const deleteItemById = async (req,res) => {
    try {
        const {id} = req.params
        const item = await Item.findOne({where: {id}})

        if(!item) {
            res.status(404).send("Item not found")
            return
        }

        await item.destroy();

        res.status(200).send({data: item, message: "Item deleted successfully"})
    } catch(e) {
        res.status(500).send(e.message);
    }
}

export const addItemReport = async(req,res) => {
    try {
        const {  
            itemName,
            category,
            itemDescription,
            status,
            location_id,
            date,
        } = req.body

        //logged in user
        const reported_by = req.user.id;

        //college_id of logged in user
        const college_id = req.user.college_id;

        // req.files contains uploaded files
        const image_urls = req.files?.map((file) => `/uploads/${file.filename}`) || [];

        //validations
        if(!itemName || itemName.trim() === "") return res.status(400).json({message: "Item name is required"});
        if(!category || category.trim() === "") return res.status(400).json({message: "Category is required"});
        if(!itemDescription || itemDescription.trim() === "") return res.status(400).json({message: "Item description is required"});
        if(!status || status.trim() === "") return res.status(400).json({message: "Status is required"});
        if(!date || date.trim() === "") return res.status(400).json({message: "Date is required"});

        //create item
        const item = await Item.create({
            itemName,
            category,
            itemDescription,
            status,
            location_id,
            date,
            image_urls,
            reported_by,
            college_id
        })

        res.status(201).send({
            data: item,
            message: "Item reported successfully"
        })

    } catch(e) {
        res.status(500).send({message: e.message});
    }
}
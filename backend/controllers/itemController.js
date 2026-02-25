import { Op, Sequelize } from "sequelize";
import { Item, Location, Users, College } from "../models/association.js";
import fs from "fs";
import path from "path";

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

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const item = await Item.findOne({ where: { id } });

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (item.reported_by !== userId) {
            return res.status(403).json({ message: "You are not authorized to edit this item" });
        }

        const {
            itemName,
            category,
            itemDescription,
            status,
            location_id,
            date,
            removed_images  // URLs to delete from disk
        } = req.body;

        // Delete removed images from disk
        if (removed_images) {
            const toRemove = Array.isArray(removed_images) ? removed_images : [removed_images];
            toRemove.forEach((imgPath) => {
                const fullPath = path.join(process.cwd(), imgPath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            });

            // Remove from existing image_urls
            item.image_urls = item.image_urls.filter(url => !toRemove.includes(url));
        }

        // Add newly uploaded images
        const newImageUrls = req.files?.map(file => `/uploads/items/${file.filename}`) || [];
        const updatedImageUrls = [...item.image_urls, ...newImageUrls];

        await item.update({
            itemName:        itemName        || item.itemName,
            category:        category        || item.category,
            itemDescription: itemDescription || item.itemDescription,
            status:          status          || item.status,
            location_id:     location_id     || item.location_id,
            date:            date            || item.date,
            image_urls:      updatedImageUrls
        });

        res.status(200).json({ data: item, message: "Item updated successfully" });

    } catch (error) {
        console.error("Update item error:", error);
        res.status(500).json({ message: "Failed to update item" });
    }
};


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
        const image_urls = req.files?.map((file) => `/uploads/items/${file.filename}`) || [];

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

export const searchItems = async (req, res) => {
  try {
    const { query, category, status, location } = req.query;

    // Base filters: hide own items + only same college
    let where = {
      reported_by: { [Op.ne]: req.user.id },
      college_id: req.user.college_id,
    };

    // Text search
    if (query) {
      where[Op.or] = [
        { itemName: { [Op.iLike]: `%${query}%` } },
        { itemDescription: { [Op.iLike]: `%${query}%` } },
      ];
    }

    // Category filter
    if (category && category.toLowerCase() !== "all") {
      where.category = category;
    }

    // Status filter
    if (status && status.toLowerCase() !== "all") {
      where.status = status;
    }

    // Location filter (via included Location)
    if (location && location.toLowerCase() !== "all") {
      where["$Location.name$"] = location;
    }

    const items = await Item.findAll({
      where,
      include: [
        {
          model: Location,
          as: "Location",
          attributes: ["id", "name", "college_id"],
        },
        {
          model: Users,
          as: "reporter",
          attributes: ["id", "fullname", "username", "email"],
        },
        {
          model: College,
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json({ data: items, message: "Items fetched successfully" });
  } catch (error) {
    console.error("Search & Filter error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// get recent lost item randomly for landing page
export const getRecentLostItems = async (req, res) => {
  try {
    const userCollegeId = req.user?.college_id; // if user is logged in
    const items = await Item.findAll({
      where: {
        status: "lost",
        ...(userCollegeId && { college_id: userCollegeId }), // filter by college if logged in
      },
      include: [
        { model: Location, attributes: ["id", "name"] },
        { model: Users, as: "reporter", attributes: ["id", "fullname"] },
      ],
      order: [ [ Sequelize.literal('RANDOM()'), ] ], // randomize
      limit: 3, // only 3 items
    });

    res.status(200).json({ data: items, message: "Recent lost items fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete items
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const item = await Item.findOne({ where: { id } });

           console.log("item.userId:", item.userId);
        console.log("item.user_id:", item.user_id);
        console.log("req.user.id:", userId);
        console.log("full item:", item.dataValues);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (item.reported_by !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this item" });
        }

        // delete image files from disk if they exist
        if (item.image_urls && item.image_urls.length > 0) {
            item.image_urls.forEach((imgPath) => {
                const fullPath = path.join(process.cwd(), imgPath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            });
        }

        await item.destroy();

        res.json({ message: "Item deleted successfully" });

    } catch (error) {
        console.error("Delete item error:", error);
        res.status(500).json({ message: "Failed to delete item" });
    }
};
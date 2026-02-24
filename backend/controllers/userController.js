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
            attributes: ["id", "fullname", "email", "role", "profile_pic_url"],
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

import { College } from "./collegeModel.js";
import { Item } from "./itemModel.js";
import { Location } from "./locationModel.js";
import { Users } from "./userModel.js";
import { Claim } from "./claimModel.js";


//User and item association
Users.hasMany(Item, {
    foreignKey: "reported_by",
    as: "reportedItems",
    onDelete: "CASCADE"
});
Item.belongsTo(Users, {
    foreignKey: "reported_by",
    as: "reporter"
});

//College and admin user association
Users.belongsTo(College, {
    foreignKey: "college_id"
});
College.hasMany(Users, {
    foreignKey: "college_id"
});

//Location and College association
Location.belongsTo(College, {
    foreignKey: "college_id"
})

College.hasMany(Location, {
    foreignKey: "college_id",
    onDelete: "CASCADE"
})

//Location and Item association
Location.hasMany(Item, { 
    foreignKey: "location_id", 
    onDelete: "SET NULL" 
});

Item.belongsTo(Location, { 
    foreignKey: "location_id" 
});

// College and Item association
College.hasMany(Item, {
  foreignKey: "college_id",
  onDelete: "CASCADE"
});

Item.belongsTo(College, {
  foreignKey: "college_id",
});



// Item and Claim association
Item.hasMany(Claim, { 
    foreignKey: "item_id", 
    onDelete: "CASCADE" 
});

Claim.belongsTo(Item, { 
    foreignKey: "item_id" 
});

// User and Claim association (claimant)
Users.hasMany(Claim, { 
    foreignKey: "claimant_id", 
    onDelete: "CASCADE" 
});
Claim.belongsTo(Users, { 
    foreignKey: "claimant_id", 
    as: "claimant" 
});



export {Users, College, Item, Location, Claim}
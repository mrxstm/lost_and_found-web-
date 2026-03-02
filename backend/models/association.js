import { College } from "./collegeModel.js";
import { Item } from "./itemModel.js";
import { Location } from "./locationModel.js";
import { Users } from "./userModel.js";


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
});

Item.belongsTo(College, {
  foreignKey: "college_id",
});


export {Users, College, Item, Location}
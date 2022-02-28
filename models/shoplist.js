const {Schema, model} = require("mongoose")


//CREATE A SCHEMA
//-----------------------------
const shopListSchema = new Schema({
    username: {type: String, required: true}, //because one user can have multiple items in their shopping list, every shopping item cannot have a unique username. Though we want it to be unique in the user model
    shopList: {type: String, required: true, unique: true}
  
}, {timestamps: true})

//USER MODEL
//-----------------------------
const ShopList = model("shopList", shopListSchema) //"shopList" is the collection,  and userSchema is the model that defines how this model works



module.exports = ShopList;
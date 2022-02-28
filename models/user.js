const {Schema, model} = require("mongoose");
//const passportLocalMongoose = require('passport-local-mongoose');

//CREATE A SCHEMA
//-----------------------------
const userSchema = new Schema({

    username: {type: String, required: true, unique:true}, 
    password: {type: String, required: true}
}, {timestamps: true});


//USER MODEL
//-----------------------------
const User = model("user", userSchema) //"user" is the collection,  and userSchema is the model that defines how this model works



module.exports = User;
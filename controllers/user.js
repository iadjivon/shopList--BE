require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();
const {SECRET} = process.env

//NEW USER - SIGNUP ROUTE
//---------------------------

router.post("/signup", async (req, res)=>{
    try {                                                          // try - catch let's us log errors as it happens 
    req.body.password = await bcrypt.hash(req.body.password, 10)  //hash the password
    const newUser = await User.create(req.body);                   // create the user
    res.status(200).json(newUser);
    // res.redirect("/login")
}                                // return new user json. status 200 means everything is fine
    catch(error){
        res.status(400).json({error})                             //status 400 means there's an error. we ask it here to log the error
    }
});


//LOGIN ROUTE 
//---------------------------


router.post("/login", async (req, res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(user){
            const match = await bcrypt.compare(password, user.password)
            if(match){
                const token = await jwt.sign({username}, SECRET);
                res.status(200).json({token})
            } else {
                res.status(400).json({error: "PASSWORD DOES NOT MACTH"});
            } 
        } else {
            res.status(400).json({error: "USER DOES NOT EXIST"}) 
              
        } 

    } 
    catch (error){
       res.status(400).json({error}) 
    }
})




module.exports = router;
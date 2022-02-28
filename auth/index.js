require("dotenv").config();
const {SECRET} = process.env;
const jwt = require("jsonwebtoken");


const auth = async (req, res, next) =>{
    //check for authorization, then parse to see if the token string exists so we can use it to verify the token
   try { 
       if(req.headers.authorization) {                         //checks for authorization header then...
        const token = req.headers.authorization.split(" ")[1]; //gives us the second thing in the array after we split it, which is the token
        const payload = await jwt.verify(token, SECRET);       // verifies the token
        if (payload){
            req.payload = payload;                       // passes the payload into the request object 
            next();                                          // passes you on to the next piece of middleware
        } else{
            res.status(400).json({error: "VERIFICATION FAILED OR NO PAYLOAD"})  
        }

    } else{
        res.status(400).json({error: "NO AUTHORIZATION HEADER"})
    }}
    catch (error){
         res.status(400).json({error});      
    }
}

module.exports = auth;
// IMPORT DEPENDENCIES 
// -----------------------------
require("dotenv").config();
const {PORT, NODE_ENV} = process.env;
const express = require("express");
const app =  express();
const mongoose = require('./db/conn');
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/cors");
const AuthRouter = require("./controllers/user");
const ShopListRouter = require("./controllers/shoplist")
// const { Router } = require("express");
const auth = require("./auth")
//trying to use passport to authenticate emails
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// MIDDLEWARES 
// -----------------------------
app.use(NODE_ENV === "production" ? cors(corsOptions) : cors()) // use whitelist cors when we are in production, otherwise anyone can make request
app.use(morgan("tiny")) //logs route
app.use(express.json()) 
app.use(express.static("public")) //parse any data that comes in encoded as json

// app.get("/", (req, res) => {
//     res.send("Hello mongo API all set");
// });

// ROUTES & ROUTERS 
// -----------------------------
app.get("/", auth, (req, res) => {
    // res.json(req.payload);
    res.send("Hello mongo API all set");
});

app.use("/auth", AuthRouter);

app.use("/shoplist", ShopListRouter);







//LISTENER
// -----------------------------
app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})
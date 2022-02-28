require ("dotenv").config()
const {MONGODBURI} = process.env
const mongoose = require ("mongoose")
const config = {useNewUrlParser: true, useUnifiedTopology: true}

//CONNECT TO MONGO
//---------------------------
mongoose.connect(MONGODBURI, config)


//EVENTS
//---------------------------
mongoose.connection
.on("open", ()=> console.log("You are connected to mongo"))
.on("close", ()=> console.log("You are disconnected to mongo"))
.on("error", (err)=> console.log(err))



module.exports = mongoose;
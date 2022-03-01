const auth = require("../auth")
const ShopList = require("../models/shoplist");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.send("Hello mongo API all set");
});

//INDEX
//---------------------------
router.get("/", auth, async (req, res)=>{
    try{
        const {username} = req.payload  
        res.status(200).json(await ShopList.find({username})) //this will search for all of the list of the user with the specified username
    }
    catch(error){
        res.status(400).json({error})
    }
})



//CREATE
//---------------------------
router.post("/", auth, async (req, res)=> {
    try{
        const {username} = req.payload  
        req.body.username = username
        res.status(200).json(await ShopList.create(req.body))

        //write a function (conditional) that asks the shoplist item(the string) to be unique

        // const isDuplicate = () =>{ 

        // }

        // return isDuplicate(req.body)

        // if (!isDuplicate(req.body)){
        //     //add the item to the list
        // } else{
        //     return null
        // }

    
    }
    catch(error){
        res.status(400).json({error})
    }
});



//UPDATE
//---------------------------
router.put("/:id", auth, async (req, res)=>{
    try{
        const {username} = req.payload  
        req.body.username = username
        const {id} = req.params
        res.status(200).json(await ShopList.findByIdAndUpdate(id, req.body, {new: true})) // the new: true makes sure that    
    }
    catch(error){
        res.status(400).json({error})
    }
})



//DELETE
//---------------------------
router.delete("/:id", auth, async (req, res)=>{
    try{
        // const {username} = req.payload  
        // req.body.username = username
        const {id} = req.params
        res.status(200).json(await ShopList.findByIdAndRemove(id))   
    }
    catch(error){
        res.status(400).json({error});
    }
})


module.exports = router;
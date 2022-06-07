const Category = require("../models/Category");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", async (req, res) =>{
    const newCategory = new Category(req.body);

    try{
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", async(req, res) =>{
    try{
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new:true });
        res.status(200).json(updatedCategory);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", async (req, res) =>{
    try{
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Category deleted!");
    }
    catch(err){
        res.status(500).json(err);
    }
});


//GET CATEGORY
router.get("/find/:id", async (req, res) =>{ 
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).json(category); 
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET ALL CATEGORY
router.get("/", async (req, res) =>{
    const query = req.query.new;
    try{
        const categories = query ? await Category.find().sort({_id:-1}).limit(3) : await Category.find();
        res.status(200).json(categories); 
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router 
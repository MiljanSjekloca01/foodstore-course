import { Router } from 'express';
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/food.model';
import { HTTP_BAD_REQUEST, HTTP_NOT_FOUND, HTTP_OK } from '../constants/http_status';
// micemo /api/foods iz svih ruta
const router = Router();

// seeding, dodavanje pocetnih podataka "Primjer podataka" "Prototip podataka"
router.get("/seed", asyncHandler(
    async (req,res) => {
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount > 0){
            res.send("Seed is already done");
            return;
        }

        await FoodModel.create(sample_foods);
        res.send("Seed is Done!");
    }
))

router.get("/", asyncHandler(
    async (req,res) => {
        //dobijanje svih vrednosti
        const foods = await FoodModel.find();
        res.send(foods);
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req,res) => {
        const searchRegex = new RegExp(req.params.searchTerm,'i');
        const foods = await FoodModel.find({name: {$regex: searchRegex}})
        res.send(foods);
    }
))

router.get("/tags", asyncHandler(
    async (req,res) => {
        const tags = await FoodModel.aggregate([
            {   // ako imamo 2 hrane sa 3 taga dobijamo 6 hrana sa po 1 tag
                $unwind:'$tags'
            },
            {
                $group:{
                    _id:'$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    name:'$_id',
                    count:'$count'
                }
            }

        ]).sort({count: -1}); // desc 

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }
        // dodavanje na prvo mjesto. suprotno od push
        tags.unshift(all); 
        res.send(tags);
    }
))

router.get("/tag/:tagName", asyncHandler(
    async (req,res) => {
        const foods = await FoodModel.find({tags: req.params.tagName})
        res.send(foods);
    }
))

router.get("/:foodId",asyncHandler(
    async (req,res) => {
        const food = await FoodModel.findById(req.params.foodId);
        res.send(food);
    }
))

// Kreiranje nove hrane,Postman
router.post("/create", asyncHandler(
    async(req:any,res:any) => {
        const food = req.body;
// Food model se nece kreirati ako mu se ne daju svi parametri
        const newFood = new FoodModel(food);
        await newFood.save();
        res.status(HTTP_OK).send(newFood);
    }
))

// Updejtovanje postojece hrane Postman
router.put("/update/:foodId",asyncHandler(
    async(req:any,res:any) => {
        const newFoodData = req.body;
        const updatedFoodData = await FoodModel.findByIdAndUpdate(req.params.foodId,newFoodData);
        
        if(!updatedFoodData || updatedFoodData === null){
            return res.status(HTTP_NOT_FOUND).send("Food not found");
        }

        res.status(HTTP_OK).send(updatedFoodData);
    }
))

// Brisanje postojece hrane Postman
router.delete("/delete/:foodId",asyncHandler(
    async(req:any,res:any) => {
        
        if(!await FoodModel.findById(req.params.foodId)){
            return res.status(HTTP_NOT_FOUND).send("User with this id not found");
        }

        await FoodModel.findByIdAndDelete(req.params.foodId);
        res.status(HTTP_OK).send("Food deleted");
    }
))


export default router;
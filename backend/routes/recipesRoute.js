import express from 'express';
import { Recipe } from '../models/recipeModel.js';
import { Inventory } from '../models/inventoryModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';


const router = express.Router();

//setting up multer for image uploads
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const directoryName = req.body.directoryName;
        const uploadPath = `backend/public/images/${directoryName}`
        try {
            await fs.mkdir(uploadPath, { recursive: true });
        } catch (error) {
            console.error('Error creating directory:', error);
        }
        cb(null, uploadPath)
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


router.get('/', async (req, res) => {                       //get all recipes
    try {
        const recipes = await Recipe.find({});
        return res.status(200).json({count: recipes.length,
                                        data: recipes});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {                    //get recipe by ID
    try {
        const { id } = req.params
        const recipe = await Recipe.findById(id);

        return res.status(200).json(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})


//filter methods

router.get('/cuisine/:cuisine', async (req, res) => {      //filter recipe by cuisine
    try {
        const { cuisine } = req.params
        const recipes = await Recipe.find({cuisine: cuisine});

        return res.status(200).json({count: recipes.length,
            data: recipes});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.get('/course/:course', async (req, res) => {      //filter recipe by course
    try {
        const { course } = req.params
        const recipes = await Recipe.find({course: course});

        return res.status(200).json({count: recipes.length,
            data: recipes});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.get('/timeReq/:time', async (req, res) => {      //filter recipe by time
    try {
        const { time } = req.params;
        const recipes = await Recipe.find({ $or: [
            { prepTime: { $exists: true, $lt: time }, cookTime: { $exists: false} },
            { cookTime: { $exists: true, $lt: time }, prepTime: { $exists: false} },
            {
              $and: [
                { prepTime: { $exists: false } },
                { cookTime: { $exists: false } },
              ],
            },
          ],});

        return res.status(200).json({count: recipes.length,
            data: recipes});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// router.get('/availability', async (req, res) => {      //filter recipe by availability
//     try {
//         const { time } = req.params;
//         const inventory = await Inventory.find();
//         const recipes = await Recipe.find({ ingredients: inventory});

//         return res.status(200).json({count: recipes.length,
//             data: recipes});
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })


//create recipe



router.post('/addRecipe', upload.array('files', 5), async (req, res) => {             //add a new recipe
    try {
        if (
            !req.body.dishName ||
            !req.body.ingredients ||
            !req.body.instructions ||
            !req.body.directoryName
        ) {
            return res.status(400).send({
                message: 'Please send all required fields: Dish Name, Ingredients and Instructions',
            })
        }

        const fileNames = req.files.map((file) => file.filename);

        const newRecipe = {
            dishName: req.body.dishName,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            source: req.body.source,
            prepTime: req.body.prepTime, 
            cookTime: req.body.cookTime,
            course: req.body.course,
            cuisine: req.body.cuisine,
            serves: req.body.serves == "" ? req.body.serves : 0,
            notes: req.body.notes,
            image: fileNames,
            videoUrl: req.body.videoUrl,
            directoryName: req.body.directoryName,
        };
        const recipe = await Recipe.create(newRecipe);
        return res.status(201).send(recipe);

    } catch(error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }    
})

//update recipe

router.put('/:id', upload.array('files', 5), async (req, res) => {                    //update recipe by ID
    try {              
        const { id } = req.params

        const fileNames = req.files.map((file) => file.filename);

        const result = await Recipe.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({message: 'Recipe not found'});
        }

        return res.status(200).send({ message: 'Recipe updated successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//delete recipe

router.delete('/:id', async (req, res) => {                 //delete recipe by ID
    try {
        const { id } = req.params;
        const result = await Recipe.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        return res.status(200).send( { message: 'Recipe deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

export default router;
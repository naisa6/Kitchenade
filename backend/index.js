import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Grocery } from './models/groceryModel.js';
import { Ingredient } from './models/ingredientModel.js';
import { Inventory } from './models/inventoryModel.js';
import { Recipe } from './models/recipeModel.js';
import { User } from './models/userModel.js';
import recipesRouter from './routes/recipesRoute.js';
import cors from 'cors';
import path from 'path'

const app = express();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/', (req, res) => {
    console.log(res);
    return res.status(234).send("The backend is running.");
})

app.use('/recipes', recipesRouter);

mongoose.connect(mongoDBURL)
        .then(() => {
            console.log('Connection to database successful.');
            app.listen(PORT, () => {
                console.log(`Listening to port: ${PORT}`)
            });
        })
        .catch((error) => {
            console.log(error)
        })


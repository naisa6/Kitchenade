import express from 'express';
import { Grocery } from '../models/groceryModel.js';

const router = express.Router();

router.get('/', async (req, res) => {                       //get all grocery items
    try {
        const grocery = await Grocery.find({user: req.body.user});
        return res.status(200).json({count: grocery.length,
                                        data: grocery});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})


// router.get('/:item', async (req, res) => {                    //get item by name
//     try {
//         const { item } = req.params
//         const grocery = await Grocery.find({item: item});

//         return res.status(200).json(grocery);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

router.post('/addItem', async (req, res) => {             //add a new recipe
    console.log(req)
    try {
        if (
            !req.body.user ||
            !req.body.category ||
            !req.body.item ||
            !req.body.quantity ||
            !req.body.inCart
        ) {
            return res.status(400).send({
                message: 'Please send all required fields: user, category, item, quantity, in cart status.',
            })
        }

        const newItem = {
            user: req.body.user,
            category: req.body.category,
            item: req.body.item,
            quantity: req.body.quantity,
            inCart: req.body.inCart,
        };
        const grocery = await Grocery.create(newItem);
        return res.status(201).send(grocery);

    } catch(error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }    
})

//update grocery

router.put('/:id', async (req, res) => {                    //update grocery by ID
    try {  

        const { id } = req.params

        const result = await Grocery.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({message: 'Grocery not found'});
        }

        return res.status(200).send({ message: 'Grocery updated successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//delete grocery

router.delete('/:id', async (req, res) => {                 //delete grocery by ID
    try {
        const { id } = req.params;
        const result = await Grocery.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Grocery not found' });
        }

        return res.status(200).send( { message: 'Grocery deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})



export default router;
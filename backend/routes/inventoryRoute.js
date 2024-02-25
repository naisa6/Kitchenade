import express from 'express';
import { Inventory } from '../models/inventoryModel.js';

const router = express.Router();

router.get('/', async (req, res) => {                       //get all inventory items
    try {
        const inventory = await Inventory.find({user: req.body.user});
        console.log("BACKEND", inventory)
        return res.status(200).json({count: inventory.length,
                                        data: inventory});
    } catch (error) {
        console.log( error.message);
        res.status(500).send({ message: error.message })
    }
})

// router.get('/:id', async (req, res) => {                    //get item by name
//     try {
//         const { id } = req.params
//         const inventory = await Inventory.findById(id);

//         return res.status(200).json(inventory);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

router.get('/getUserInventory/:id/:section', async (req, res) => {
    try {
        const { id } = req.params
        const { section } = req.params
        const userItems = await Inventory.find({user: id, section: section}).sort({ expiryDate: 1 }).exec();        
 
        return res.status(200).json(userItems);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

router.get('/:item', async (req, res) => {                    //get item by name
    try {
        const { item } = req.params
        const inventory = await Inventory.find({item: item});

        return res.status(200).json(inventory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.post('/addItem', async (req, res) => {             //add a new recipe
    console.log(req)
    try {
        if (
            !req.body.user ||
            !req.body.section ||
            !req.body.item ||
            !req.body.quantity ||
            !req.body.purchaseDate
        ) {
            return res.status(400).send({
                message: 'Please send all required fields: user, section, item, quantity, purchase date.',
            })
        }

        const newItem = {
            user: req.body.user,
            section: req.body.section,
            item: req.body.item,
            amount: req.body.amount,
            unit: req.body.unit,
            quantity: req.body.quantity,
            availability: req.body.availability, 
            purchaseDate: req.body.purchaseDate,
            expiryDate: req.body.expiryDate,
        };
        const inventory = await Inventory.create(newItem);
        return res.status(201).send(inventory);

    } catch(error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }    
})

//update inventory

router.put('/:id', async (req, res) => {                    //update inventory by ID
    try {

        const { id } = req.params

        const result = await Inventory.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({message: 'Item not found'});
        }

        return res.status(200).send({ message: 'Inventory updated successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//delete inventory

router.delete('/:id', async (req, res) => {                 //delete inventory by ID
    try {
        const { id } = req.params;
        const result = await Inventory.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.status(200).send( { message: 'Item deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})



export default router;
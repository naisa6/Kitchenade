import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
   
try {
    const { id } = req.params;
    const user = await User.findById(id)
    return res.status(200).json(user);
} catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message})
}
})


router.post('/addUser',  async (req, res) => {             //add a new recipe
    try {
        if (
            !req.body.userId ||
            !req.body.email ||
            !req.body.inventorySection ||
            !req.body.shoppingListCategory ||
            !req.body.favourites
           
        ) {
            return res.status(400).send({
                message: 'Please send all required fields: Dish Name, Ingredients and Instructions',
            })
        }

        const newUser = {
            userId: req.body.userId,
            email: req.body.email,
            inventorySection: req.body.inventorySection,
            shoppingListCategory: req.body.shoppingListCategory,
            favourites: req.body.favourites,
            
        };
        const user = await User.create(newUser);
        return res.status(201).send(user);

    } catch(error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }    
})



router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      if (req.body.inventorySection === "") {
        return
      }
  
      const updatedDocument = await User.findByIdAndUpdate(
        id,
        { $push: { inventorySection: req.body.inventorySection } },
        { new: true }
      );
  
      if (!updatedDocument) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('Document updated:', updatedDocument);
      return res.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
export default router;
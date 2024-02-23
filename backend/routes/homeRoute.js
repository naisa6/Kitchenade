import express from 'express';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        return response.status(200).json();
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})


export default router;
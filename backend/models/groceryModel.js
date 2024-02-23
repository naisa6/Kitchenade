import mongoose from "mongoose";

const grocerySchema = mongoose.Schema(
    {   user: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        item: {
            type: Array,
            required: true,            
        },
        quantity: {
            type: String,
            required: true,            
        },
        inCart: {
            type: Boolean,
            required: true,            
        },
    },
    {
        timestamps: true,
    }
)

export const Grocery = mongoose.model('Grocery', grocerySchema); 
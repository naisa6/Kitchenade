import mongoose from "mongoose";

const ingredientSchema = mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
)

export const Ingredient = mongoose.model('Ingredient', ingredientSchema); 
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        inventorySection: {
            type: Array,            
        },
        shoppingListCategory: {
            type: Array,            
        },
        favourites: {
            type: Array,            
        },
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('User', userSchema); 
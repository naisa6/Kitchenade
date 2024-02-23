import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('User', userSchema); 
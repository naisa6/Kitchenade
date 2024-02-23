import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
    {   user: {
            type: String,
            required: true,
        },
        section: {
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
        availability: {
            type: Number,            
        },
        purchaseDate: {
            type: Date,
            required: true,            
        },
        expiryDate: {
            type: Date,            
        },
    },
    {
        timestamps: true,
    }
)

export const Inventory = mongoose.model('Inventory', inventorySchema); 
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
            type: String,
            required: true,            
        },
        amount: {
            type: Number,
              
        },
        unit: {
            type: String,            
        },
        quantity: {
            type: Number,
        },
        availability: {
            type: Number
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
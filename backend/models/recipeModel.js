import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
    {
        dishName: {
            type: String,
            required: true,
        },
        image: {
            type: Array,            
        },
        videoUrl: {
            type: String,            
        },
        source: {
            type: String,            
        },
        prepTime: {
            type: Number,            
        },
        cookTime: {
            type: Number,            
        },
        course: {
            type: String
        },
        cuisine: {
            type: String,            
        },
        serves: {
            type: Number,            
        },
        ingredients: {
            type: Array,
            required: true,            
        },
        instructions: {
            type: Array,
            required: true,            
        },
        notes: {
            type: String,            
        },
        directoryName: {            //this property has been added for images
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export const Recipe = mongoose.model('Recipe', recipeSchema); 
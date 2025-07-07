import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema({
    category: {
        type: String,
        required: true,
        index: true,
    },
    monthDate: {
        type: Date,
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export default mongoose.models.Budget || mongoose.model("Budget", budgetSchema);
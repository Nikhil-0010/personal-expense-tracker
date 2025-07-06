import mongoose, { Schema } from "mongoose";
import { CATEGORIES } from "@/constants/categories";

const transactionSchema = new Schema({
    amount: { type: Number, required: true, index: true },
    date: { type: Date, required: true, index: true },
    description: { type: String },
    category: {
        type: String,
        enum: CATEGORIES.map((c) => c.value),
        required:true,
        index: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

//  indexes for faster queries
transactionSchema.index({ date: 1, category: 1, amount: -1 });



export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

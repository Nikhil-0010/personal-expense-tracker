import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    amount: { type: Number, required: true, index: true },
    date: { type: Date, required: true, index: true },
    description: { type: String },
    createdAt:{
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

// Add indexes for faster queries


export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Transaction from "@/models/transaction";
import { formatData } from "@/lib/formatter";

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        const body = await req.json();
        const { amount, date, description, category } = body;

        if (!amount || !date || !description || !category) {
            return NextResponse.json({ error: "All fields are required", success: false }, { status: 400 });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            {_id: id},
            { amount, date, description, category },
            { new: true }
        );

        if (!updatedTransaction) {
            return NextResponse.json({ error: "Transaction not found", success: false }, { status: 404 });
        }
        return NextResponse.json({ data: updatedTransaction, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error updating transaction:", error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = params;

        const deletedTransaction = await Transaction.findByIdAndDelete({_id: id});

        if (!deletedTransaction) {
            return NextResponse.json({ error: "Transaction not found", success: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Transaction deleted", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}
import connectDB from "@/lib/db";
import { formatData } from "@/lib/formatter";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const transactions = await Transaction.find().sort({ date: -1 });
        // console.log(transactions)
        const readyData = formatData(transactions);
        // console.log(readyData);
        return NextResponse.json({ data: readyData, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { amount, date, description, category } = body;
        if (!amount || !date || !description || !category) {
            return NextResponse.json({ error: "All fields are required", success: false }, { status: 400 });
        }

        const newTransactions = await Transaction.create({ amount, date, description, category });
        return NextResponse.json({ data: newTransactions, success: true }, { status: 201 });
    } catch (error) {
        console.error("Error creating transaction:", error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}
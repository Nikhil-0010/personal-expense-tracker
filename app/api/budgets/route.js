import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Budget from "@/models/budget";

export async function GET(req) {
  try {
    await connectDB();
    const monthDate = req.nextUrl.searchParams.get("monthDate");
    const query = monthDate ? { monthDate } : {};
    const budgets = await Budget.find(query);
    return NextResponse.json({ data: budgets, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { category, monthDate, amount } = await req.json();

    if (!category || !monthDate || !amount) {
      return NextResponse.json({ error: "All fields required", success: false }, { status: 400 });
    }

    const newBudget = await Budget.create({ category, monthDate, amount });
    return NextResponse.json({ data: newBudget, success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

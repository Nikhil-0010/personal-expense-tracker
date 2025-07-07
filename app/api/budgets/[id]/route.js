import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Budget from "@/models/budget";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { category, monthDate, amount } = await req.json();

    const updated = await Budget.findByIdAndUpdate(id, { category, monthDate, amount }, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Budget not found", success: false }, { status: 404 });
    }

    return NextResponse.json({ data: updated, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const deleted = await Budget.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Budget not found", success: false }, { status: 404 });
    }

    return NextResponse.json({ message: "Budget deleted", success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

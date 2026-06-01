import { NextResponse } from "next/server";
import data from "../../../../data/testimonials.json";

export async function GET() {
    return NextResponse.json(data);
}

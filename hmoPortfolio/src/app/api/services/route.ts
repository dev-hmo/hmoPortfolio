import { NextResponse } from "next/server";
import data from "../../../../data/services.json";

export async function GET() {
    return NextResponse.json(data);
}

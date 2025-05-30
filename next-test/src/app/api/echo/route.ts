import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json()
    return NextResponse.json({
        message: `안녕, ${body.name}님!`,
    })
}
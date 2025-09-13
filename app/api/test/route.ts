import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Test API route is working!" })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log("Test API received:", body);
  return NextResponse.json({ message: "Test API route is working!", received: body })
}

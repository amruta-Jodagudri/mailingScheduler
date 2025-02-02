import { NextResponse } from "next/server"

const mailers = [
  { id: "1", name: "Welcome Email" },
  { id: "2", name: "Newsletter" },
  { id: "3", name: "Promotional Offer" },
]

export async function GET() {
  return NextResponse.json(mailers)
}


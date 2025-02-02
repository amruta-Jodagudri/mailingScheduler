import { type NextRequest, NextResponse } from "next/server"

interface Mailing {
  id: string;
  mailerId: string;
  listId: string;
  scheduleDate: string;
}

const mailings: Mailing[] = []

export async function GET() {
  return NextResponse.json(mailings)
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  const newMailing: Mailing = {
    id: Date.now().toString(),
    mailerId: data.mailerId,
    listId: data.listId,
    scheduleDate: data.scheduleDate,
  }

  mailings.push(newMailing)
  return NextResponse.json(newMailing, { status: 201 })
}

import { NextResponse } from "next/server";
import data from "@/db.json";
export async function GET() {
  return NextResponse.json({
    name: "davron",
  });
}

export async function POST(request: Request) {
  const { name, password } = await request.json();
  if (!name || !password) {
    return NextResponse.json(
      {
        error: "Login and passwrord required",
      },
      { status: 400 }
    );
  }
  const findUser = data.find(
    (value) => value.name === name && value.password === password
  );
  if (!findUser) {
    return NextResponse.json(
      {
        message: "Name or password encorect",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({
    ...findUser,
  });
}

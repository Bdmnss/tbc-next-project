import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return NextResponse.json(
      { message: "Name and email are required" },
      { status: 400 }
    );
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  try {
    await client.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING",
      [name, email]
    );

    return NextResponse.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { message: "Error inserting data" },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}

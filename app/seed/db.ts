import { Client } from "pg";

export async function connectToDatabase() {
  if (typeof window !== "undefined") {
    throw new Error(
      "Database connections should only be created on the server side"
    );
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  return client;
}

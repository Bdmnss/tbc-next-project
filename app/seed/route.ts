import { NextResponse } from 'next/server';
import { Client } from 'pg';
import placeholderData from './placeholder-data';

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE
      );
    `);

    const insertPromises = placeholderData.map(user =>
      client.query('INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING', [user.name, user.email])
    );

    await Promise.all(insertPromises);

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ message: 'Error seeding database' }, { status: 500 });
  } finally {
    await client.end();
  }
}
import { connectToDatabase } from "../app/seed/db";

async function fetchUsers() {
  const client = await connectToDatabase();

  try {
    const res = await client.query("SELECT * FROM users");
    return res.rows;
  } finally {
    await client.end();
  }
}

export default async function UsersList() {
  const users = await fetchUsers();

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Users</h2>
      <ul className="list-disc list-inside">
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

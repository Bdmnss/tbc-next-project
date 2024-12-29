import { connectToDatabase } from "../app/seed/db";

async function fetchUsers(searchQuery: string, page: number) {
  const client = await connectToDatabase();
  const offset = (page - 1) * 10;

  try {
    const res = await client.query(
      "SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 LIMIT 10 OFFSET $2",
      [`%${searchQuery}%`, offset]
    );
    return res.rows;
  } finally {
    await client.end();
  }
}

export default async function UsersList({
  searchQuery,
  currentPage,
}: {
  searchQuery: string;
  currentPage: number;
}) {
  const users = await fetchUsers(searchQuery, currentPage);

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

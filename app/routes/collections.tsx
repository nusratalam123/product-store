import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getCollections } from "../server/collections.server";

export const loader = async () => {
  const collections = await getCollections();
  return json({ collections });
};

export default function CollectionsPage() {
  const { collections } = useLoaderData();

  return (
    <div>
      <h1>Collections</h1>
      <Link to="/collections/new">Create New Collection</Link>
      <ul>
        {collections.map((col: any) => (
          <li key={col.id}>
            <Link to={`/collections/${col.id}`}>{col.name} ({col.priority})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

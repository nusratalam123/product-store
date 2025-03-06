import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getCollectionById, updateCollection } from "../server/collections.server";

export const loader = async ({ params }: any) => {
  const collection = await getCollectionById(Number(params.id));
  return json({ collection });
};

export const action = async ({ request, params }: any) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const priority = formData.get("priority");

  await updateCollection(Number(params.id), name, priority, []);
  return redirect("/collections");
};

export default function EditCollectionPage() {
  const { collection } = useLoaderData();

  return (
    <div>
      <h1>Edit Collection</h1>
      <Form method="post">
        <label>Name: <input type="text" name="name" defaultValue={collection.name} required /></label>
        <label>Priority:
          <select name="priority" defaultValue={collection.priority}>
            <option value="">None</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <button type="submit">Update</button>
      </Form>
    </div>
  );
}

import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createCollection } from "../server/collections.server";

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const priority = formData.get("priority");

  if (!name) {
    return json({ error: "Name is required" }, { status: 400 });
  }

  await createCollection(name, priority, []);
  return redirect("/collections");
};

export default function NewCollectionPage() {
  return (
    <div>
      <h1>Create Collection</h1>
      <Form method="post">
        <label>Name: <input type="text" name="name" required /></label>
        <label>Priority:
          <select name="priority">
            <option value="">None</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <button type="submit">Create</button>
      </Form>
    </div>
  );
}

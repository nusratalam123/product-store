import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchProducts } from "../lib/shopifyAPI"; // Import API function

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    throw new Response("Shop parameter is missing", { status: 400 });
  }

  const products = await fetchProducts(shop);
  return json({ products });
};

export default function ProductsPage() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Shopify Products</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

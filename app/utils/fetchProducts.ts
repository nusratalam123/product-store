import shopify from "./shopify";

export async function fetchProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopify.query({ data: query });
  return response.body.data.products.edges.map((edge: any) => ({
    shopifyId: edge.node.id,
    title: edge.node.title,
    price: edge.node.variants.edges[0].node.price,
  }));
}

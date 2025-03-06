import { gql } from "graphql-request";
import { getSession } from "@shopify/shopify-app-remix/session";
import { shopify } from "../shopify.server";

// Fetch products from Shopify
export const fetchShopifyProducts = async (shop: string) => {
  const session = await getSession(shop);

  const query = gql`
    query {
      products(first: 20) {
        edges {
          node {
            id
            title
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopify.graphql(query, session);
  return response.products.edges.map((product: any) => ({
    id: product.node.id,
    title: product.node.title,
    image: product.node.images.edges.length ? product.node.images.edges[0].node.src : null,
  }));
};

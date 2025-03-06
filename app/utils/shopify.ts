import { Shopify } from "@shopify/shopify-api";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const shopify = new Shopify.Clients.GraphQL(
    process.env.SHOPIFY_STORE_URL!,
    process.env.SHOPIFY_API_KEY!
  );
export default shopify;

export const apiVersion = "2023-07";
import { prisma } from "../prisma/client";
import { fetchShopifyProducts } from "../lib/shopifyAPI";

// Fetch all collections
export const getCollections = async () => {
  return await prisma.collection.findMany();
};

// Fetch a single collection
export const getCollectionById = async (id: number) => {
  return await prisma.collection.findUnique({ where: { id } });
};

// Create a new collection
export const createCollection = async (name: string, priority: string | null, products: string[]) => {
  return await prisma.collection.create({
    data: { name, priority, products },
  });
};

// Update a collection
export const updateCollection = async (id: number, name: string, priority: string | null, products: string[]) => {
  return await prisma.collection.update({
    where: { id },
    data: { name, priority, products },
  });
};

// Delete a collection
export const deleteCollection = async (id: number) => {
  return await prisma.collection.delete({ where: { id } });
};

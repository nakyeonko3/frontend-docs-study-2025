import { Product } from "../types/Product";

export function useProductFiltering(
  products: Product[],
  filterText: string,
  inStockOnly: boolean
) {
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(filterText.toLowerCase()) &&
      (!inStockOnly || product.stocked)
  );

  const productsByCategory = filteredProducts.reduce<Record<string, Product[]>>(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  return {
    productsByCategory,
  };
}

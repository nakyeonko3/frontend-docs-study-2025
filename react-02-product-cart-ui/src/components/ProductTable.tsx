import { useProductFiltering } from "../hooks/useProductFiltering";
import { Product } from "../types/Product";
import { ProductCategoryGroup } from "./ProductCategoryGroup";

interface ProductTableProps {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}

export function ProductTable({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps) {
  const { productsByCategory } = useProductFiltering(
    products,
    filterText,
    inStockOnly
  );

  const hasFilteredProducts = Object.keys(productsByCategory).length > 0;

  if (!hasFilteredProducts) {
    return <div>No products found</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(productsByCategory).map(([category, products]) => (
          <ProductCategoryGroup
            key={`ProductCategoryGroup-${category}`}
            category={category}
            products={products}
          />
        ))}
      </tbody>
    </table>
  );
}

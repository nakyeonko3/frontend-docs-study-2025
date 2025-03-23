import { Product } from "../types/Product";
import { useProductFiltering } from "../hooks/useProductFiltering";
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

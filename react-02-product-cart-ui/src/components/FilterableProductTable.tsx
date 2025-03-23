import { Product } from "../types/Product";
import { SearchBar } from "./SearchBar";
import { ProductTable } from "./ProductTable";

interface FilterableProductTableProps {
  products: Product[];
}

export function FilterableProductTable({
  products,
}: FilterableProductTableProps) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

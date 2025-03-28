import { Product } from "../types/Product";
import { SearchBar } from "./SearchBar";
import { ProductTable } from "./ProductTable";
import { useState } from "react";

interface FilterableProductTableProps {
  products: Product[];
}

export function FilterableProductTable({
  products,
}: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [somthingText, setSomthingText] = useState("");

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <input
        value={somthingText}
        onChange={(e) => setSomthingText(e.target.value)}
        placeholder="say something!"
      ></input>
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

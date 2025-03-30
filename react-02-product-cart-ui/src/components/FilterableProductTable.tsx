import { useState } from "react";
import { Product } from "../types/Product";
import { ProductTable } from "./ProductTable";
import { SearchBar } from "./SearchBar";

interface FilterableProductTableProps {
  products: Product[];
}

export function FilterableProductTable({
  products,
}: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [somethingText, setSomethingText] = useState("");

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <input
        value={somethingText}
        onChange={(e) => setSomethingText(e.target.value)}
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

import { Product } from "../types/Product";
import { ProductCategoryRow } from "./ProductCategoryRow";
import { ProductRow } from "./ProductRow";

export function ProductCategoryGroup({
  category,
  products,
}: {
  category: string;
  products: Product[];
}) {
  return (
    <>
      <ProductCategoryRow category={category} />
      {products.map((product) => (
        <ProductRow product={product} key={`ProuctRow-${product.name}`} />
      ))}
    </>
  );
}

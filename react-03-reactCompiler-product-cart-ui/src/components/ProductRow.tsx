import { Product } from "../types/Product";
import { formatCurrency } from "../utils/formatters";

interface ProductRowProps {
  product: Product;
}

export function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{formatCurrency(product.price)}</td>
    </tr>
  );
}

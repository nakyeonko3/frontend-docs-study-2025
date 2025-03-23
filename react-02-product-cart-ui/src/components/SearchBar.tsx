interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
}
export function SearchBar({ filterText, inStockOnly }: SearchBarProps) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." />
      <label>
        <input type="checkbox" checked={inStockOnly} /> Only show products in
        stock
      </label>
    </form>
  );
}

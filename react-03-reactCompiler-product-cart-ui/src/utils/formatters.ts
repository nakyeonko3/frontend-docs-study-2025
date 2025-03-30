export function formatCurrency(price: number, currency: string = "$"): string {
  return `${currency}${price}`;
}

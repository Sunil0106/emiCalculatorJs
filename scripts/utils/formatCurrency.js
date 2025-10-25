export function convertToCents(amount) {
  return amount * 100;
}

export function convertCentsToDollars(amount) {
  return (amount / 100).toFixed(2);
}

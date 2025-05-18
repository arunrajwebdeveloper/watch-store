export const currencyFormatter = (
  amount: number = 0,
  currency: string = "INR"
) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

import numeral from "numeral";

export function useShowAmount(num: number): string {
  if (num >= 1000) {
    return Math.ceil(num).toString();
  }
  let amount = numeral(num).format("0.000");
  while (
    (amount.includes(".") && amount[amount.length - 1] === "0") ||
    amount[amount.length - 1] === "."
  ) {
    amount = amount.slice(0, -1);
  }
  return amount;
}

import numeral from "numeral";

export function useShowAmount(num: number) {
  let amount = numeral(num).format("0.00");
  while (
    (amount.includes(".") && amount[amount.length - 1] === "0") ||
    amount[amount.length - 1] === "."
  ) {
    amount = amount.slice(0, -1);
  }
  return amount;
}

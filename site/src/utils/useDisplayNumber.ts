import numeral from "numeral";

export function useDisplayNumber(number: number) {
  let formatted = numeral(number).format("0.00a");
  if (formatted.split(".")[1][1] === "0") {
    formatted = numeral(number).format("0.0a");
    if (formatted.split(".")[1][0] === "0") {
      formatted = numeral(number).format("0a");
    }
  }
  return formatted;
}

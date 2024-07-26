import numeral from "numeral";

export function useDisplayNumber(number: number): string {
  let indicator = null;
  let formatted = numeral(number).format("0.0000a");
  if (isNaN(Number(formatted[formatted.length - 1]))) {
    indicator = formatted[formatted.length - 1];
    formatted = formatted.slice(0, -1);
  }

  while (
    (formatted.includes(".") && formatted[formatted.length - 1] === "0") ||
    formatted[formatted.length - 1] === "."
  ) {
    formatted = formatted.slice(0, -1);
  }

  if (formatted.length > 4) {
    formatted = formatted.slice(0, -(formatted.length - 4));
  }

  if (formatted[formatted.length - 1] === ".") {
    formatted = formatted.slice(0, -1);
  }

  if (indicator) {
    formatted += indicator;
  }
  return formatted;
}

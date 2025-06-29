import numeral from "numeral";

export class NumberFormatterUtils {
  static formatPriceUsd(value: number): string {
    if (value > 1) return numeral(value).format("0.00");
    if (value > 0.01) return numeral(value).format("0.[000000]");
    if (value > 0.0001) return numeral(value).format("0.[00000000]");
    return numeral(value).format("0,0.00"); // fallback
  }
}

"use client";

import numeral from "numeral";
import chainData from "../../../lib/chains.json";
import { Token } from "@lifi/sdk";
import lodash from "lodash";
export class NumberFormatterUtils {
  static formatPriceUsd(value: number): string {
    if (value > 1) return numeral(value).format("0.00");
    if (value > 0.01) return numeral(value).format("0.[000000]");
    if (value > 0.0001) return numeral(value).format("0.[00000000]");
    return numeral(value).format("0,0.00"); // fallback
  }
  static formatNumber(value: number): string {
    if (value > 1) return numeral(value).format("0.00");
    if (value > 0.01) return numeral(value).format("0.[000000]");
    if (value > 0.0001) return numeral(value).format("0.[00000000]");
    return numeral(value).format("0,0.00"); // fallback
  }

  static isNumeric(str: string) {
    return !Array.isArray(str) && Number(str) - parseFloat(str) + 1 >= 0;
  }
}

export function explore(token: Token, chainId: number) {
  const chain = chainData.find((e) => e.result.data.chain.chainId === chainId);
  if (chain) {
    if (typeof window != "undefined") {
      window.open(
        `${chain.result.data.chain.explorers[0].url}/address/${token.address}`,
      );
    }
  }
}

export function copy(value: string) {
  if (typeof navigator !== "undefined") {
    navigator.clipboard.writeText(value);
  }
}

export const ZeroAddress = "0x0000000000000000000000000000000000000000";

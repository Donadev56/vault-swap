"use client";

import numeral from "numeral";
import chainData from "../../../lib/chains.json";
import { Token } from "@lifi/sdk";
import lodash from "lodash";
import { formatUnits } from "ethers";
export class NumberFormatterUtils {
  static formatPriceUsd(value: number): string {
    return NumberFormatterUtils.formatSmallAmount(value);
  }
  static formatNumber(value: number): string {
    return NumberFormatterUtils.formatSmallAmount(value);
  }

  static formatSmallAmount(value: number): string {
    if (value > 1) return numeral(value).format("0.00");
    if (value > 0.01) return numeral(value).format("0.[000000]");
    if (value > 0.0001) return numeral(value).format("0.[00000000]");
    return numeral(value).format("0.[000000000000]");
  }

  static isNumeric(str: string) {
    return !Array.isArray(str) && Number(str) - parseFloat(str) + 1 >= 0;
  }
  static toWei(value: string, decimals: number) {
    return BigInt(Number(value) * 10 ** decimals);
  }
  static toEth(value: bigint, decimals: number) {
    return NumberFormatterUtils.formatSmallAmount(
      Number(formatUnits(value, decimals)),
    );
  }

  static calculatePercent(oldValue: number, newValue: number) {
    const percent = ((newValue - oldValue) / oldValue) * 100;
    return percent.toFixed(2);
  }
  static calculatePriceBytoken(
    priceOfTokenOne: number,
    priceOfTokenTwo: number,
  ) {
    return;
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
export function exploreTx(hash: string, chainId: number) {
  const chain = chainData.find((e) => e.result.data.chain.chainId === chainId);
  if (chain) {
    if (typeof window != "undefined") {
      window.open(`${chain.result.data.chain.explorers[0].url}/tx/${hash}`);
    }
  }
}

export function exploreLifiTx(hash: string) {
  if (typeof window != "undefined") {
    window.open(`https://scan.li.fi/tx/${hash}`);
  }
}

export function copy(value: string) {
  if (typeof navigator !== "undefined") {
    navigator.clipboard.writeText(value);
  }
}

export const ZeroAddress = "0x0000000000000000000000000000000000000000";

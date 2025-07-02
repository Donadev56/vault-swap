import { Route } from "@lifi/sdk";
import { NumberFormatterUtils } from "../utils/utils";
import { FaGasPump } from "react-icons/fa";
import { IconButton } from "./ui/buttons";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HeightCollapse } from "./ui/animated-components";

export const FeeDetails = ({ route }: { route: Route }) => {
  const [isExpended, setIsExpended] = React.useState(false);

  function calculatePercent(value: string, newValue: string) {
    const percent = NumberFormatterUtils.calculatePercent(
      Number(value),
      Number(newValue),
    );
    return percent;
  }

  const details = [
    {
      label: "Network Cost",
      value:
        Number(route.gasCostUSD || 0) > 0.01
          ? `$${route.gasCostUSD}`
          : "<$0.01",
    },
    {
      label: "VaultSwap fee",
      value: `${route.steps[0]?.estimate?.feeCosts?.[0]?.amountUSD ?? "N/A"}`,
    },
    {
      label: "Price Impact",
      value: `${calculatePercent(route.fromAmountUSD, route.toAmountUSD)}%`,
    },
    {
      label: "Min. Received",
      value: NumberFormatterUtils.toEth(
        BigInt(route.toAmountMin),
        route.toToken.decimals,
      ),
    },
  ];

  return (
    <div className="border p-3 rounded-2xl flex flex-col w-full items-center justify-between">
      <div className=" flex w-full items-center justify-between">
        <div className="text-[12px] w-full text-muted-foreground font-[500]">
          1 {route.fromToken?.symbol} ≈{" "}
          {NumberFormatterUtils.formatNumber(
            Number(route.fromToken?.priceUSD || "0") /
              Number(route.toToken?.priceUSD || "0"),
          )}{" "}
          {route.toToken?.symbol}
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <FaGasPump />
          </div>
          <div className="text-muted-foreground text-[12px] font-[600]">
            {Number(route.gasCostUSD || 0) > 0.01
              ? `$${route.gasCostUSD}`
              : "<$0.01"}
          </div>
          <div>
            <IconButton
              style={{ backgroundColor: "var(--second-color)" }}
              onClick={() => setIsExpended(!isExpended)}
              size={30 as any}
            >
              {isExpended ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
          </div>
        </div>
      </div>

      <div className=" flex w-full items-center justify-between">
        <HeightCollapse
          className="w-full gap-2 pt-3 pb-2"
          condition={isExpended}
        >
          <div className="flex w-full gap-1 justify-between flex-col items-center">
            {details.map((item, index) => (
              <div
                key={index}
                className="flex w-full justify-between items-center"
              >
                <div className="uppercase">{item.label}</div>
                <div className="font-bold text-[14px]">{item.value}</div>
              </div>
            ))}
          </div>
        </HeightCollapse>
      </div>
    </div>
  );
};

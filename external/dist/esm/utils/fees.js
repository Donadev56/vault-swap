import { formatTokenPrice } from "./format.js";
export const getAccumulatedFeeCostsBreakdown = (route, included = false) => {
  const gasCosts = getGasCostsBreakdown(route);
  const feeCosts = getFeeCostsBreakdown(route, included);
  const gasCostUSD = gasCosts.reduce(
    (sum, gasCost) => sum + gasCost.amountUSD,
    0,
  );
  const feeCostUSD = feeCosts.reduce(
    (sum, feeCost) => sum + feeCost.amountUSD,
    0,
  );
  const combinedFeesUSD = gasCostUSD + feeCostUSD;
  return {
    gasCosts,
    feeCosts,
    gasCostUSD,
    feeCostUSD,
    combinedFeesUSD,
  };
};
export const getGasCostsBreakdown = (route) => {
  return Array.from(
    route.steps
      .reduce((groupedGasCosts, step) => {
        const gasCosts = step.execution?.gasCosts ?? step.estimate.gasCosts;
        if (gasCosts?.length) {
          const {
            token,
            amount: gasCostAmount,
            amountUSD: gasCostAmountUSD,
          } = getStepFeeCostsBreakdown(gasCosts);
          const groupedGasCost = groupedGasCosts.get(token.chainId);
          const amount = groupedGasCost
            ? groupedGasCost.amount + gasCostAmount
            : gasCostAmount;
          const amountUSD = groupedGasCost
            ? groupedGasCost.amountUSD + gasCostAmountUSD
            : gasCostAmountUSD;
          groupedGasCosts.set(token.chainId, {
            amount,
            amountUSD,
            token,
          });
          return groupedGasCosts;
        }
        return groupedGasCosts;
      }, new Map())
      .values(),
  );
};
export const getFeeCostsBreakdown = (route, included) => {
  return Array.from(
    route.steps
      .reduce((groupedFeeCosts, step) => {
        let feeCosts = step.execution?.feeCosts ?? step.estimate.feeCosts;
        if (typeof included === "boolean") {
          feeCosts = feeCosts?.filter(
            (feeCost) => feeCost.included === included,
          );
        }
        if (feeCosts?.length) {
          const {
            token,
            amount: feeCostAmount,
            amountUSD: feeCostAmountUSD,
          } = getStepFeeCostsBreakdown(feeCosts);
          const groupedFeeCost = groupedFeeCosts.get(token.chainId);
          const amount = groupedFeeCost
            ? groupedFeeCost.amount + feeCostAmount
            : feeCostAmount;
          const amountUSD = groupedFeeCost
            ? groupedFeeCost.amountUSD + feeCostAmountUSD
            : feeCostAmountUSD;
          groupedFeeCosts.set(token.chainId, {
            amount,
            amountUSD,
            token,
          });
          return groupedFeeCosts;
        }
        return groupedFeeCosts;
      }, new Map())
      .values(),
  );
};
export const getStepFeeCostsBreakdown = (feeCosts) => {
  const { token } = feeCosts[0];
  const { amount, amountUSD } = feeCosts.reduce(
    (acc, feeCost) => {
      const feeAmount = BigInt(Number(feeCost.amount).toFixed(0) || 0);
      const amountUSD = formatTokenPrice(
        feeAmount,
        feeCost.token.priceUSD,
        feeCost.token.decimals,
      );
      acc.amount += feeAmount;
      acc.amountUSD += amountUSD;
      return acc;
    },
    { amount: 0n, amountUSD: 0 },
  );
  return {
    amount,
    amountUSD,
    token,
  };
};
//# sourceMappingURL=fees.js.map

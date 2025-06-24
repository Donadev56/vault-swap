import microdiff from "microdiff";
export const isRouteDone = (route) => {
  return route.steps.every((step) => step.execution?.status === "DONE");
};
export const isRoutePartiallyDone = (route) => {
  return route.steps.some((step) =>
    step.execution?.process.some((process) => process.substatus === "PARTIAL"),
  );
};
export const isRouteRefunded = (route) => {
  return route.steps.some((step) =>
    step.execution?.process.some((process) => process.substatus === "REFUNDED"),
  );
};
export const isRouteFailed = (route) => {
  return route.steps.some((step) => step.execution?.status === "FAILED");
};
export const isRouteActive = (route) => {
  if (!route) {
    return false;
  }
  const isDone = isRouteDone(route);
  const isFailed = isRouteFailed(route);
  const alreadyStarted = route.steps.some((step) => step.execution);
  return !isDone && !isFailed && alreadyStarted;
};
export const getUpdatedProcess = (currentRoute, updatedRoute) => {
  const processDiff = microdiff(currentRoute, updatedRoute).find((diff) =>
    diff.path.includes("process"),
  );
  if (!processDiff) {
    return undefined;
  }
  // Find process index in the diff array so we can slice the complete rpocess object
  // e.g. ['steps', 0, 'execution', 'process', 0, 'message']
  const processDiffIndex =
    processDiff.path.findIndex((path) => path === "process") + 2;
  const processPathSlice = processDiff.path.slice(0, processDiffIndex);
  // Reduce updated route using the diff path to get updated process
  const process = processPathSlice.reduce(
    (obj, path) => obj[path],
    updatedRoute,
  );
  return process;
};
export const getSourceTxHash = (route) => {
  return route?.steps[0].execution?.process
    .filter((process) => process.type !== "TOKEN_ALLOWANCE")
    .find((process) => process.txHash)?.txHash;
};
//# sourceMappingURL=utils.js.map

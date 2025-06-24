export function validateExpiryTimestamp(expiryTimestamp) {
  const isValid = new Date(expiryTimestamp).getTime() > 0;
  if (!isValid) {
    console.warn("useTimer Invalid expiryTimestamp settings", expiryTimestamp);
  }
  return isValid;
}
export function validateOnExpire(onExpire) {
  const isValid = onExpire && typeof onExpire === "function";
  if (onExpire && !isValid) {
    console.warn("useTimer Invalid onExpire settings function", onExpire);
  }
  return isValid;
}
//# sourceMappingURL=validate.js.map

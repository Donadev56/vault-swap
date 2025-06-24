export function getTimeFromMilliseconds(millisecs, isCountDown = true) {
  const totalSeconds = isCountDown
    ? Math.ceil(millisecs / 1000)
    : Math.floor(millisecs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor(millisecs % 1000);
  return {
    totalMilliseconds: millisecs,
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
  };
}
export function getMillisecondsFromExpiry(expiry) {
  const now = new Date().getTime();
  const milliSecondsDistance = expiry?.getTime() - now;
  return milliSecondsDistance > 0 ? milliSecondsDistance : 0;
}
//# sourceMappingURL=time.js.map

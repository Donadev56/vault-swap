export type TimeFromMillisecondsType = {
  totalMilliseconds: number;
  totalSeconds: number;
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
};
export type AMPMType = "" | "pm" | "am";
export type FormattedTimeFromMillisecondsType = {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  ampm?: AMPMType;
};
export declare function getTimeFromMilliseconds(
  millisecs: number,
  isCountDown?: boolean,
): TimeFromMillisecondsType;
export declare function getMillisecondsFromExpiry(expiry: Date): number;

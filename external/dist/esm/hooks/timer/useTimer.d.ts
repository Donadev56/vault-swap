import { type TimeFromMillisecondsType } from "./time.js";
export type useTimerSettingsType = {
  expiryTimestamp: Date;
  onExpire?: () => void;
  autoStart?: boolean;
  interval?: number;
};
export type useTimerResultType = TimeFromMillisecondsType & {
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: (newExpiryTimestamp: Date, newAutoStart?: boolean) => void;
  isRunning: boolean;
};
/**
 * `useTimer` from https://github.com/amrlabib/react-timer-hook
 */
export declare function useTimer({
  expiryTimestamp: expiry,
  onExpire,
  autoStart,
  interval: customInterval,
}: useTimerSettingsType): useTimerResultType;

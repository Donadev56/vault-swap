import type { Route } from "@lifi/sdk";
interface QueuedMessage {
  id: string;
  priority: number;
  props?: Record<string, any>;
}
export declare const useMessageQueue: (
  route?: Route,
  allowInteraction?: boolean,
) => {
  messages: QueuedMessage[];
  hasMessages: boolean;
  isLoading: boolean;
};
export {};

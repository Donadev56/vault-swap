import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { BaseTransactionButton } from "../../components/BaseTransactionButton/BaseTransactionButton.js";
import { useMessageQueue } from "../../components/Messages/useMessageQueue.js";
export const StartTransactionButton = ({ onClick, route, text, loading }) => {
  const { messages, isLoading } = useMessageQueue(route, true);
  const hasNonGasMessages = useMemo(() => {
    return messages.some((message) => message.id !== "INSUFFICIENT_GAS");
  }, [messages]);
  return _jsx(BaseTransactionButton, {
    onClick: onClick,
    text: text,
    disabled: hasNonGasMessages,
    loading: isLoading || loading,
    route: route,
  });
};
//# sourceMappingURL=StartTransactionButton.js.map

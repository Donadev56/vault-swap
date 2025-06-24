import { jsx as _jsx } from "react/jsx-runtime";
import { Collapse } from "@mui/material";
import { AccountDeployedMessage } from "./AccountDeployedMessage.js";
import { AccountNotDeployedMessage } from "./AccountNotDeployedMessage.js";
import { FundsSufficiencyMessage } from "./FundsSufficiencyMessage.js";
import { GasSufficiencyMessage } from "./GasSufficiencyMessage.js";
import { MissingRouteRequiredAccountMessage } from "./MissingRouteRequiredAccountMessage.js";
import { ToAddressRequiredMessage } from "./ToAddressRequiredMessage.js";
import { useMessageQueue } from "./useMessageQueue.js";
export const WarningMessages = ({ route, allowInteraction, ...props }) => {
  const { messages, hasMessages } = useMessageQueue(route, allowInteraction);
  const getMessage = () => {
    switch (messages[0]?.id) {
      case "MISSING_ROUTE_REQUIRED_ACCOUNT":
        return _jsx(MissingRouteRequiredAccountMessage, {
          chain: messages[0].props?.chain,
          address: messages[0].props?.address,
          ...props,
        });
      case "INSUFFICIENT_FUNDS":
        return _jsx(FundsSufficiencyMessage, { ...props });
      case "INSUFFICIENT_GAS":
        return _jsx(GasSufficiencyMessage, {
          insufficientGas: messages[0].props?.insufficientGas,
          ...props,
        });
      case "ACCOUNT_NOT_DEPLOYED":
        return _jsx(AccountNotDeployedMessage, { ...props });
      case "ACCOUNT_DEPLOYED":
        return _jsx(AccountDeployedMessage, { ...props });
      case "TO_ADDRESS_REQUIRED":
        return _jsx(ToAddressRequiredMessage, { ...props });
      default:
        return null;
    }
  };
  return _jsx(Collapse, {
    in: hasMessages,
    timeout: 225,
    unmountOnExit: true,
    mountOnEnter: true,
    children: getMessage(),
  });
};
//# sourceMappingURL=WarningMessages.js.map

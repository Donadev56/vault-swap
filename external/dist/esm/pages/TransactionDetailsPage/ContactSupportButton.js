import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useWidgetEvents } from "../../hooks/useWidgetEvents.js";
import { WidgetEvent } from "../../types/events.js";
export const ContactSupportButton = ({ supportId }) => {
  const { t } = useTranslation();
  const widgetEvents = useWidgetEvents();
  const handleClick = () => {
    if (!widgetEvents.all.has(WidgetEvent.ContactSupport)) {
      const url = "https://discord.gg/lifi";
      const target = "_blank";
      const rel = "nofollow noreferrer";
      window.open(url, target, rel);
    } else {
      widgetEvents.emit(WidgetEvent.ContactSupport, { supportId });
    }
  };
  return _jsx(Button, {
    onClick: handleClick,
    fullWidth: true,
    children: t("button.contactSupport"),
  });
};
//# sourceMappingURL=ContactSupportButton.js.map

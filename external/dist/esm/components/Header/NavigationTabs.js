import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { useFieldActions } from "../../stores/form/useFieldActions.js";
import { useSplitSubvariantStore } from "../../stores/settings/useSplitSubvariantStore.js";
import { Tab, Tabs } from "../Tabs/Tabs.style.js";
import { HeaderAppBar } from "./Header.style.js";
export const NavigationTabs = () => {
  const { t } = useTranslation();
  const [state, setState] = useSplitSubvariantStore((state) => [
    state.state,
    state.setState,
  ]);
  const { setFieldValue } = useFieldActions();
  const handleChange = (_, value) => {
    setFieldValue("fromAmount", "");
    setFieldValue("fromToken", "");
    setFieldValue("toToken", "");
    setState(value === 0 ? "swap" : "bridge");
  };
  return _jsx(HeaderAppBar, {
    elevation: 0,
    sx: { paddingTop: 1, paddingBottom: 0.5 },
    children: _jsxs(Tabs, {
      value: state === "swap" ? 0 : 1,
      onChange: handleChange,
      "aria-label": "tabs",
      indicatorColor: "primary",
      children: [
        _jsx(Tab, { label: t("header.swap"), disableRipple: true }),
        _jsx(Tab, { label: t("header.bridge"), disableRipple: true }),
      ],
    }),
  });
};
//# sourceMappingURL=NavigationTabs.js.map

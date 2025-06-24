import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Check from "@mui/icons-material/Check";
import CheckBoxOutlineBlankOutlined from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlined from "@mui/icons-material/CheckBoxOutlined";
import IndeterminateCheckBoxOutlined from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  Tooltip,
  debounce,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { FullPageContainer } from "../components/FullPageContainer.js";
import { ListItemText } from "../components/ListItemText.js";
import { StickySearchInput } from "../components/Search/SearchInput.js";
import { SearchList } from "../components/Search/SearchInput.style.js";
import { SearchNotFound } from "../components/Search/SearchNotFound.js";
import { SettingsListItemButton } from "../components/SettingsListItemButton.js";
import { useDefaultElementId } from "../hooks/useDefaultElementId.js";
import { useHeader } from "../hooks/useHeader.js";
import { useScrollableContainer } from "../hooks/useScrollableContainer.js";
import { useTools } from "../hooks/useTools.js";
import { useSettingsActions } from "../stores/settings/useSettingsActions.js";
import { useSettingsStore } from "../stores/settings/useSettingsStore.js";
const SelectAllCheckbox = ({
  allCheckboxesSelected,
  anyCheckboxesSelected,
  noCheckboxesAvailable,
  onClick,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const tooltipTitle = noCheckboxesAvailable
    ? undefined
    : allCheckboxesSelected
      ? t("tooltip.deselectAll")
      : t("tooltip.selectAll");
  return _jsx(Tooltip, {
    title: tooltipTitle,
    children: _jsx(IconButton, {
      size: "medium",
      edge: theme?.navigation?.edge ? "end" : false,
      onClick: onClick,
      children: allCheckboxesSelected
        ? _jsx(CheckBoxOutlined, {})
        : anyCheckboxesSelected
          ? _jsx(IndeterminateCheckBoxOutlined, {})
          : _jsx(CheckBoxOutlineBlankOutlined, {}),
    }),
  });
};
export const SelectEnabledToolsPage = ({ type }) => {
  const typeKey = type.toLowerCase();
  const { tools } = useTools();
  const { setToolValue, toggleToolKeys } = useSettingsActions();
  const [enabledTools, disabledTools] = useSettingsStore(
    (state) => [state[`_enabled${type}`], state[`disabled${type}`]],
    shallow,
  );
  const { t } = useTranslation();
  const elementId = useDefaultElementId();
  const scrollableContainer = useScrollableContainer(elementId);
  const [filteredTools, setFilteredTools] = useState(tools?.[typeKey] ?? []);
  const headerAction = useMemo(
    () =>
      _jsx(SelectAllCheckbox, {
        allCheckboxesSelected:
          !!filteredTools.length &&
          filteredTools.every((tool) => !disabledTools.includes(tool.key)),
        anyCheckboxesSelected:
          !!filteredTools.length &&
          filteredTools.some((tool) => disabledTools.includes(tool.key)),
        noCheckboxesAvailable: !filteredTools.length,
        onClick: () =>
          toggleToolKeys(
            type,
            filteredTools.map((tool) => tool.key),
          ),
      }),
    [disabledTools, toggleToolKeys, type, filteredTools],
  );
  useHeader(t(`settings.enabled${type}`), headerAction);
  const handleClick = (key) => {
    setToolValue(type, key, !enabledTools[key]);
  };
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setFilteredTools(tools?.[typeKey] ?? []);
    } else {
      setFilteredTools(
        tools?.[typeKey]
          ? tools[typeKey].filter((tool) =>
              tool.name.toLowerCase().includes(value.toLowerCase()),
            )
          : [],
      );
    }
    if (scrollableContainer) {
      scrollableContainer.scrollTop = 0;
    }
  };
  const debouncedSearchInputChange = debounce(handleSearchInputChange, 250);
  return _jsxs(FullPageContainer, {
    disableGutters: true,
    children: [
      _jsx(StickySearchInput, {
        onChange: debouncedSearchInputChange,
        placeholder: t(`main.search${type}`),
      }),
      filteredTools.length
        ? _jsx(SearchList, {
            children: filteredTools.map((tool) =>
              _jsxs(
                SettingsListItemButton,
                {
                  onClick: () => handleClick(tool.key),
                  children: [
                    _jsx(ListItemAvatar, {
                      children: _jsx(Avatar, {
                        src: tool.logoURI,
                        alt: tool.name,
                        children: tool.name[0],
                      }),
                    }),
                    _jsx(ListItemText, { primary: tool.name }),
                    enabledTools[tool.key] && _jsx(Check, { color: "primary" }),
                  ],
                },
                tool.name,
              ),
            ),
          })
        : _jsx(SearchNotFound, {
            message: t(`info.message.empty${type}List`),
            adjustForStickySearchInput: true,
          }),
    ],
  });
};
//# sourceMappingURL=SelectEnabledToolsPage.js.map

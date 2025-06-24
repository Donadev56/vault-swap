import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAccount } from "@lifi/wallet-management";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useChain } from "../../hooks/useChain.js";
import { useDebouncedWatch } from "../../hooks/useDebouncedWatch.js";
import { useTokenBalances } from "../../hooks/useTokenBalances.js";
import { useTokenSearch } from "../../hooks/useTokenSearch.js";
import { useWidgetEvents } from "../../hooks/useWidgetEvents.js";
import { FormKeyHelper } from "../../stores/form/types.js";
import { useFieldValues } from "../../stores/form/useFieldValues.js";
import { WidgetEvent } from "../../types/events.js";
import { TokenNotFound } from "./TokenNotFound.js";
import { VirtualizedTokenList } from "./VirtualizedTokenList.js";
import { useTokenSelect } from "./useTokenSelect.js";
import { filteredTokensComparator } from "./utils.js";
export const TokenList = ({ formType, parentRef, height, onClick }) => {
  const emitter = useWidgetEvents();
  const [selectedChainId] = useFieldValues(FormKeyHelper.getChainKey(formType));
  const [tokenSearchFilter] = useDebouncedWatch(320, "tokenSearchFilter");
  const { chain: selectedChain, isLoading: isSelectedChainLoading } =
    useChain(selectedChainId);
  const { account } = useAccount({
    chainType: selectedChain?.chainType,
  });
  const {
    tokens: chainTokens,
    tokensWithBalance,
    isLoading: isTokensLoading,
    isBalanceLoading,
    featuredTokens,
    popularTokens,
  } = useTokenBalances(selectedChainId);
  let filteredTokens = tokensWithBalance ?? chainTokens ?? [];
  const normalizedSearchFilter = tokenSearchFilter?.replaceAll("$", "");
  const searchFilter = normalizedSearchFilter?.toUpperCase() ?? "";
  filteredTokens = tokenSearchFilter
    ? filteredTokens
        .filter(
          (token) =>
            token.name?.toUpperCase().includes(searchFilter) ||
            token.symbol
              .toUpperCase()
              // Replace ₮ with T for USD₮0
              .replaceAll("₮", "T")
              .includes(searchFilter) ||
            token.address.toUpperCase().includes(searchFilter),
        )
        .sort(filteredTokensComparator(searchFilter))
    : filteredTokens;
  const tokenSearchEnabled =
    !isTokensLoading &&
    !filteredTokens.length &&
    !!tokenSearchFilter &&
    !!selectedChainId;
  const { token: searchedToken, isLoading: isSearchedTokenLoading } =
    useTokenSearch(selectedChainId, normalizedSearchFilter, tokenSearchEnabled);
  const isLoading =
    isTokensLoading ||
    isSelectedChainLoading ||
    (tokenSearchEnabled && isSearchedTokenLoading);
  const tokens = filteredTokens.length
    ? filteredTokens
    : searchedToken
      ? [searchedToken]
      : filteredTokens;
  const handleTokenClick = useTokenSelect(formType, onClick);
  const showCategories =
    Boolean(featuredTokens?.length || popularTokens?.length) &&
    !tokenSearchFilter;
  // biome-ignore lint/correctness/useExhaustiveDependencies: Should fire only when search filter changes
  useEffect(() => {
    if (normalizedSearchFilter) {
      emitter.emit(WidgetEvent.TokenSearch, {
        value: normalizedSearchFilter,
        tokens,
      });
    }
  }, [normalizedSearchFilter, emitter]);
  return _jsxs(Box, {
    ref: parentRef,
    style: { height, overflow: "auto" },
    children: [
      !tokens.length && !isLoading
        ? _jsx(TokenNotFound, { formType: formType })
        : null,
      _jsx(VirtualizedTokenList, {
        account: account,
        tokens: tokens,
        scrollElementRef: parentRef,
        chainId: selectedChainId,
        chain: selectedChain,
        isLoading: isLoading,
        isBalanceLoading: isBalanceLoading,
        showCategories: showCategories,
        onClick: handleTokenClick,
      }),
    ],
  });
};
//# sourceMappingURL=TokenList.js.map

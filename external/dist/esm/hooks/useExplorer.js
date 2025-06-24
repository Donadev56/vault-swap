import { ChainId } from "@lifi/sdk";
import { lifiExplorerUrl } from "../config/constants.js";
import { useAvailableChains } from "../hooks/useAvailableChains.js";
import { useWidgetConfig } from "../providers/WidgetProvider/WidgetProvider.js";
const sanitiseBaseUrl = (baseUrl) => baseUrl.trim().replace(/\/+$/, "");
export const useExplorer = () => {
  const { explorerUrls } = useWidgetConfig();
  const { getChainById } = useAvailableChains();
  const getExplorerConfig = (chain) => {
    const resolvedChain = Number.isFinite(chain) ? getChainById(chain) : chain;
    const explorerUrl =
      (resolvedChain
        ? (explorerUrls?.[resolvedChain.id]?.[0] ??
          resolvedChain.metamask.blockExplorerUrls[0])
        : explorerUrls?.internal?.[0]) || lifiExplorerUrl;
    const url = typeof explorerUrl === "string" ? explorerUrl : explorerUrl.url;
    const defaultTxPath = resolvedChain?.id === ChainId.SUI ? "txblock" : "tx";
    const defaultAddressPath =
      resolvedChain?.id === ChainId.SUI ? "coin" : "address";
    const txPath =
      typeof explorerUrl === "string"
        ? defaultTxPath
        : explorerUrl.txPath || defaultTxPath;
    const addressPath =
      typeof explorerUrl === "string"
        ? defaultAddressPath
        : explorerUrl.addressPath || defaultAddressPath;
    return {
      url: sanitiseBaseUrl(url),
      txPath,
      addressPath,
    };
  };
  const getTransactionLink = ({ txHash, txLink, chain }) => {
    if (!txHash && txLink) {
      return txLink;
    }
    const config = getExplorerConfig(chain);
    return `${config.url}/${config.txPath}/${txHash}`;
  };
  const getAddressLink = (address, chain) => {
    const config = getExplorerConfig(chain);
    return `${config.url}/${config.addressPath}/${address}`;
  };
  return {
    getTransactionLink,
    getAddressLink,
  };
};
//# sourceMappingURL=useExplorer.js.map

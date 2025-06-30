import { ExtendedChain, Token } from "@lifi/sdk";
import { Web3Utils } from "../utils/web3-utils";
import { useModal } from "./modal-context";
import StAppBar from "@/components/ui/st-app-bar";
import { CryptoAvatar } from "../components/ui/crypto-avatar";
import { copy, explore, NumberFormatterUtils } from "../utils/utils";
import ListTitle from "@/components/ui/listTitle";
import { cn } from "@/lib/utils";
import { Button } from "../components/ui/buttons";
import { CopyIcon, LinkIcon, X } from "lucide-react";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { BsCopy } from "react-icons/bs";

export function useOnSelectToken() {
  const modalState = useModal();
  function onSelectToken(
    token: Token,
    chain: ExtendedChain,
    {
      onCancel,
      onContinue,
    }: { onCancel?: () => void; onContinue?: () => void },
  ) {
    modalState.showModal({
      className: "rounded-t-[35px]",
      containerStyle: {
        backgroundColor: "var(--background)",
      },

      children: (
        <div className="flex px-3 w-full flex-col gap-2 items-center">
          <div className="flex  w-full">
            <div className="flex  ietms-center w-full gap-4.5">
              <div className="min-w-[60px] w-[60px] ">
                <CryptoAvatar size={60} token={token} chain={chain} />
              </div>
              <div className="flex justify-center flex-col">
                <div className="font-bold max-w-full truncate text-[20px] ">
                  {token.symbol}
                </div>
                <div className="text-[12px] font-[500]  max-w-full truncate">
                  {token.name}
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end ">
              <X className="cursor-pointer" onClick={onCancel} />
            </div>
          </div>

          <div className="flex pt-2 flex-col w-full">
            <div className="text-[12px] font-[500]  ">Current price</div>
            <div className="font-extrabold py-2 text-[24px]">
              ${NumberFormatterUtils.formatPriceUsd(Number(token.priceUSD))}
            </div>
          </div>
          <div className="flex pb-2 flex-col w-full">
            <div className="text-[12px] font-[500]  ">Contract addrerss</div>
            <div className="font-[700] gap-2 flex w-full items-center text-[18px]">
              <div>{Web3Utils.truncatedAddress(token.address)}</div>
              <div>
                <BsCopy onClick={() => copy(token.address)} />
              </div>
              <div>
                <LaunchIcon onClick={() => explore(token, chain.id)} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center"></div>
          <div className="flex w-full gap-2 justify-center items-center ">
            <Button
              onClick={() => {
                if (onContinue) {
                  onContinue();
                }
              }}
              style={{
                width: "100%",
                paddingInline: 10,
                paddingBlock: 8,
              }}
              className="w-full px-4 py-2"
            >
              Continue
            </Button>
          </div>
        </div>
      ),
    });
  }

  return onSelectToken;
}

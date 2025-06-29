import { ExtendedChain, Token } from "@lifi/sdk";
import { Web3Utils } from "../utils/web3-utils";
import { useModal } from "./modal-context";
import StAppBar from "@/components/ui/st-app-bar";
import { CryptoAvatar } from "../components/ui/crypto-avatar";
import { explore, NumberFormatterUtils } from "../utils/utils";
import ListTitle from "@/components/ui/listTitle";
import { cn } from "@/lib/utils";
import { Button } from "../components/ui/buttons";

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
    const details = [
      {
        title: "Name",
        value: token.name,
      },
      {
        title: "Symbol",
        value: token.symbol,
      },
      {
        title: "Decimal",
        value: token.decimals,
      },
      {
        title: "Contract",
        value: Web3Utils.truncatedAddress(token.address),
        onclick: () => explore(token, chain.id),
        isLink: true,
      },
    ];
    modalState.showModal({
      className: "rounded-t-[35px]",
      containerStyle: {
        backgroundColor: "var(--background)",
      },
      header: (
        <StAppBar
          fixed={false}
          className="px-[20px]"
          title={<div className="font-bold text-[19px]">{token.symbol}</div>}
          leading={
            <CryptoAvatar
              size={40}
              token={token}
              useSkeletonChain={!chain}
              chain={chain || undefined}
            />
          }
          actions={[
            <div className="font-bold max-w-full truncate">
              ${NumberFormatterUtils.formatPriceUsd(Number(token.priceUSD))}
            </div>,
          ]}
        />
      ),

      children: (
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center">
            {details.map((e) => {
              return (
                <ListTitle
                  leading=""
                  title={e.title}
                  actions={[
                    <div
                      className={cn(
                        "truncate  text-foreground/80 font-bold max-w-full",
                        e.isLink && "underline",
                      )}
                    >
                      {e.value}
                    </div>,
                  ]}
                  onClick={e.onclick}
                />
              );
            })}
          </div>
          <div className="flex w-full gap-2 justify-center items-center p-2">
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
            <Button
              onClick={() => {
                if (onCancel) {
                  onCancel();
                }
              }}
              style={{
                width: "100%",
                paddingInline: 10,
                paddingBlock: 8,
                backgroundColor: "var(--destructive)",
              }}
            >
              Close
            </Button>
          </div>
        </div>
      ),
    });
  }

  return onSelectToken;
}

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExtendedChain } from "@lifi/sdk";
import { IconButton } from "./buttons";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";

export const ChainCards = ({
  chains,
  setSelectedChain,
  selectedChain,
  onViewMore,
}: {
  chains: ExtendedChain[];
  setSelectedChain: (chain: ExtendedChain) => void;
  selectedChain: ExtendedChain | null;
  onViewMore: () => void;
}) => {
  const lifiConfig = useCustomLifiConfig();
  const maxChains = 10;
  const selectedBg = `${lifiConfig.themeColor}20`;

  const skeleton = Array.from({ length: 10 }).map((e) => {
    const icon = (
      <IconButton
        style={{
          padding: 9,
          backgroundColor: "var(--card-hover-color)",
        }}
        className="all-tr"
        size={40 as any}
      ></IconButton>
    );

    return (
      <Tooltip>
        <TooltipTrigger asChild>{icon}</TooltipTrigger>
      </Tooltip>
    );
  });

  return (
    <div className="flex flex-wrap justify-center items-center gap-0.5 ">
      {chains.length > 0
        ? chains.map((e, i) => {
            const isSelected = selectedChain?.id === e.id;
            const remainingChains = chains.length - i + 1;
            const maxReach = i >= maxChains;
            const isLast = i == maxChains - 1;

            const icon = (
              <IconButton
                style={{
                  backgroundColor: isSelected ? selectedBg : "",
                  padding: 9,
                }}
                className="all-tr"
                onClick={() => setSelectedChain(e)}
                size={55 as any}
              >
                {e.logoURI ? (
                  <img
                    width={55}
                    className="rounded-xl "
                    src={e.logoURI}
                    alt={e.name}
                  />
                ) : (
                  "U"
                )}
              </IconButton>
            );
            function onSelect(chain: ExtendedChain) {
              if (!isLast) {
                setSelectedChain(chain);
              } else {
                onViewMore();
              }
            }
            return (
              <Tooltip>
                <TooltipTrigger
                  style={{
                    border: isSelected
                      ? `2px solid ${lifiConfig.themeColor}`
                      : "",
                  }}
                  asChild
                >
                  {isLast ? (
                    <IconButton onClick={() => onSelect(e)} size={50 as any}>
                      <div className=" rounded-[15px] p-2 border-dashed border">
                        +{remainingChains}
                      </div>
                    </IconButton>
                  ) : maxReach ? undefined : (
                    icon
                  )}
                </TooltipTrigger>
                {!isLast && (
                  <TooltipContent className="">{e.name}</TooltipContent>
                )}
              </Tooltip>
            );
          })
        : skeleton}
    </div>
  );
};

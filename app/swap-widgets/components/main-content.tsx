import { ArrowDown } from "lucide-react";
import { CryptoAvatar } from "../components/ui/crypto-avatar";
import {
  SwapInputCard,
  SwapInputContent,
  SwapInputTitle,
} from "../components/ui/sawp-input";
import WalletIcon from "@mui/icons-material/Wallet";
import { SwapRoutes } from "../routes/routes";

export const MainContent = ({
  bridge = false,
  useExternalWallet,
}: {
  bridge?: boolean;
  useExternalWallet?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex  w-full justify-center flex-col gap-2">
        <a href={SwapRoutes.selectChainFrom}>
          <SwapInputCard className="cursor-pointer bg-hover hover:bg-[var(--card-hover-color)] ">
            <SwapInputTitle>From</SwapInputTitle>
            <SwapInputContent>
              <div data-slot="swap-avatar" className="">
                <CryptoAvatar useSkeletonChain useSkeletonToken size={40} />
              </div>
              <div data-slot="swap-main-element" className="">
                <div>Select Chain and Token</div>
              </div>
            </SwapInputContent>
          </SwapInputCard>
        </a>
        <div className="w-full flex justify-center items-center">
          <div className="w-[30px] min-w-[30px] scale-95 bg-background flex mt-[-15px] mb-[-15px] items-center justify-center min-h-[30px] h-[30%] border rounded-full ">
            <ArrowDown size={18} />
          </div>
        </div>
        <a href={SwapRoutes.selectChainTo}>
          <SwapInputCard className="cursor-pointer  bg-hover hover:bg-[var(--card-hover-color)] ">
            <SwapInputTitle>To</SwapInputTitle>
            <SwapInputContent>
              <div data-slot="swap-avatar" className="">
                <CryptoAvatar useSkeletonChain useSkeletonToken size={40} />
              </div>
              <div data-slot="swap-main-element" className="">
                <div>{bridge ? "Select Chain and Token" : "Select Token"}</div>
              </div>
            </SwapInputContent>
          </SwapInputCard>
        </a>
      </div>

      <div>
        <SwapInputCard className="">
          <SwapInputTitle>Send</SwapInputTitle>
          <SwapInputContent>
            <div data-slot="swap-avatar" className="">
              <CryptoAvatar useSkeletonChain useSkeletonToken size={40} />
            </div>
            <div data-slot="swap-main-element" className="w-full">
              <input
                style={{ width: "100%" }}
                type="text"
                placeholder="0"
                className="outline-none  text-[20px] w-full text-foreground font-bold  "
              />
              <div className="text-[12px]">$0.00</div>
            </div>
          </SwapInputContent>
        </SwapInputCard>
      </div>
      {useExternalWallet && (
        <div>
          <SwapInputCard className="border-dashed">
            <SwapInputTitle>Send To Wallet</SwapInputTitle>
            <SwapInputContent>
              <div data-slot="swap-avatar" className="">
                <div className="w-[35px] min-h-[35px] min-w-[35px] border-dashed flex items-center justify-center  h-[35px] border   rounded-[10px] ">
                  <WalletIcon style={{ width: 20 }} />
                </div>
              </div>
              <div data-slot="swap-main-element" className="w-full">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Enter Wallet Address"
                  className="outline-none  text-[18px] w-full text-foreground font-bold  "
                />
              </div>
            </SwapInputContent>
          </SwapInputCard>
        </div>
      )}
    </div>
  );
};

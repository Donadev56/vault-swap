import { Search } from "lucide-react";
import { SwapInputCard, SwapInputContent } from "./swap-input";
import { cn } from "@/lib/utils";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const SwapSearchInput = ({ ...props }: InputProps) => {
  return (
    <SwapInputCard className="border rounded-[10px]">
      <SwapInputContent className="gap-0">
        <div data-slot="swap-avatar" className="">
          <div className="w-[35px] min-h-[35px] min-w-[35px] border-none flex items-center justify-center  h-[35px] border   rounded-[10px] ">
            <SearchIcon />
          </div>
        </div>
        <div data-slot="swap-main-element" className="w-full">
          <input
            {...props}
            className={cn("focus:outline-none", props.className)}
          />
        </div>
      </SwapInputContent>
    </SwapInputCard>
  );
};

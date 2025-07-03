import { Trash2 } from "lucide-react";
import { Blur } from "./ui/animated-components";
import { Button, IconButton } from "./ui/buttons";
import { CryptoAvatar } from "./ui/crypto-avatar";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import {
  OrderManagerContextType,
  useOrderManager,
} from "../hooks/order-manager";

export const SwapHistoryCard = ({
  order,
  onHide,
}: {
  order: OrderManagerContextType;
  onHide: () => void;
}) => {
  const manager = useOrderManager();
  return (
    <Blur key={order.orderId}>
      <div className="border border-dashed rounded-2xl all-tr bg-hover p-3">
        <div>
          <div className="flex items-center w-full justify-between">
            <CryptoAvatar
              size={40}
              token={order.fromToken as any}
              chain={order.fromChain as any}
            />
            <IoIosArrowForward />
            <CryptoAvatar
              size={40}
              token={order.toToken as any}
              chain={order.toChain as any}
            />
          </div>
          <div className="flex my-2 w-full flex-col">
            <div>
              <span className="font-bold">{order.fromToken?.symbol}</span> To{" "}
              <span className="font-bold"> {order.toToken?.symbol}</span>
            </div>
            {order.orderType === "swap" ? (
              <div>
                On <span className="font-bold">{order.fromChain?.name}</span>
              </div>
            ) : (
              <div>
                From <span className="font-bold ">{order.fromChain?.name}</span>{" "}
                to <span className="font-bold">{order.toChain?.name}</span>
              </div>
            )}
            <div className="text-muted-foreground my-1">
              Do you want to go back on this order?
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                onHide();
                manager.reCreateOrder(order);
              }}
            >
              Continue
            </Button>
            <IconButton
              onClick={() => manager.deleteSwapState(order.orderId || "")}
              size={40 as any}
              style={{
                border: "1px dashed var(--destructive)",
                borderRadius: 10,
                color: "var(--destructive)",
              }}
            >
              <Trash2 />
            </IconButton>
            <IconButton
              onClick={onHide}
              size={40 as any}
              style={{
                border: "1px dashed var(--second-color)",
                borderRadius: 10,
                color: "var(--foreground)",
              }}
              className="border"
            >
              <IoEyeOffOutline />
            </IconButton>
          </div>
          <div></div>
        </div>
      </div>
    </Blur>
  );
};

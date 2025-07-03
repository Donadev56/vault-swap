import ThemeToggle from "./ui/theme-toogle";

import { StHeader } from "./ui/st-header";
import useWeb3 from "../hooks/useWeb3";

import React, { useState } from "react";
import { OrderStep, Status, useOrderManager } from "../hooks/order-manager";
import { toast } from "sonner";
import { useModal } from "../hooks/modal-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsInfoCircle } from "react-icons/bs";
import { VscError } from "react-icons/vsc";
import { CiNoWaitingSign } from "react-icons/ci";
import { FeeDetails } from "./fees-details";
import { Blur, Scale, TranslateY } from "./ui/animated-components";
import { Button } from "./ui/buttons";
import { CryptoAvatar } from "./ui/crypto-avatar";
import {
  explore,
  exploreLifiTx,
  exploreTx,
  formatError,
  NumberFormatterUtils,
} from "../utils/utils";
import { FaCircleCheck } from "react-icons/fa6";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import { CiCircleCheck } from "react-icons/ci";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export const TransactionView = () => {
  const web3 = useWeb3();
  const manager = useOrderManager();
  const modal = useModal();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<{ title: string; desc: string }>();

  const isInit = React.useRef(false);
  const config = useCustomLifiConfig();

  const generateRoutes = async () => {
    try {
      await manager.generateSteps();
      await executeRoutes();
    } catch (error) {
      console.error(error);
      setError({
        title: "Transaction error",
        desc: formatError(error),
      });
    }
  };
  const executeRoutes = async () => {
    try {
      const result = await manager.executeRouteSteps();
      if (result) {
        setIsSuccess(result);
      }
    } catch (error) {
      console.error(error);
      toast.error((error as any).toString());
    }
  };
  React.useEffect(() => {
    if (isInit.current) {
      return;
    }
    isInit.current = true;
    if (!manager.orderId) {
      console.warn("Bad state");
      return;
    }

    generateRoutes();
  }, []);
  React.useEffect(() => {
    web3.changeNetwork();
  }, []);

  function getButtonState() {
    let state: { label: string; onClick?: () => void } = {
      label: "Loading...",
    };
    const executionState = manager.trExeState;
    const creationState = manager.trGeneratorState;
    const id = manager.orderId;

    if (isSuccess) {
      state = { label: "Back", onClick: modal.hideModal };
      return state;
    }
    if (!id) {
      return state;
    }
    if (!executionState && !creationState) {
      return state;
    } else if (creationState && creationState[id] === Status.Failed) {
      state = { label: "Try again", onClick: executeRoutes };
      return state;
    } else if (creationState && creationState[id] === Status.Pending) {
      return state;
    } else if (creationState && creationState[id] === Status.Done) {
      if (executionState && executionState[id] === Status.Pending) {
        return state;
      } else if (executionState && executionState[id] === Status.Failed) {
        state = { label: "Try again", onClick: executeRoutes };
        return state;
      } else if (executionState && executionState[id] === Status.Done) {
        state = { label: "Back", onClick: () => modal.hideModal };
        return state;
      }
    }

    return state;
  }

  return (
    <>
      <div className="flex w-full h-full  flex-col items-center">
        <div className="flex w-full flex-col h-full justify-between ">
          <div className="flex flex-col gap-3 w-full items-center">
            <StHeader
              onBack={() => modal.hideModal()}
              title={manager.isBridge() ? "Swap and bridge" : "Swap"}
            />

            <div className="flex flex-col  gap-2items-center w-full ">
              <div className="flex text-[20px] justify-center font-bold items-center  w-full">
                Transaction Step(s)
              </div>

              <div className="flex w-full gap-2 flex-col items-center ">
                {manager.orderSteps.map((e) => {
                  return (
                    <Tooltip>
                      <TooltipTrigger
                        className="flex  w-full items-center flex-col"
                        asChild
                      >
                        <Blur key={e.id}>
                          {" "}
                          <StepRenderer e={e} />{" "}
                        </Blur>
                      </TooltipTrigger>
                      <TooltipContent className="">
                        <div className="font-bold">{e.name}</div>

                        <div>{e.description}</div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
              <TranslateY condition={!!error}>
                <Alert
                  className="overflow-hidden max-w-full max-h-[270px]"
                  variant="destructive"
                >
                  <AlertCircleIcon />
                  <AlertTitle>Potential way to solve the problem</AlertTitle>
                  <AlertDescription>
                    <ul>
                      <li>Try increasing the exchange amount</li>
                      <li>Try to see if the amount can cover the gas costs</li>
                      <li>Make sure to approve token spend requests</li>
                      <li>Check that you are on the correct network</li>
                    </ul>

                    <p>
                      Contact us via telegram{" "}
                      <a href="https://t.me/Opennode_tech">
                        @Opennode_tech
                      </a>{" "}
                    </p>
                  </AlertDescription>
                </Alert>
              </TranslateY>
              <TranslateY condition={!!error}>
                <Alert
                  className="overflow-hidden max-w-full max-h-[300px]"
                  variant="destructive"
                >
                  <AlertCircleIcon />
                  <AlertTitle>{error && error.title}</AlertTitle>
                  {error && error.desc && (
                    <AlertDescription>{error.desc}</AlertDescription>
                  )}
                </Alert>
              </TranslateY>
              <TranslateY condition={isSuccess} className="">
                <div className="flex gap-1 rounded-2xl my-2 p-4 border w-full flex-col items-center justify-center">
                  <div className="flex gap-3 w=full items-center py-2">
                    <CryptoAvatar
                      size={50}
                      token={manager.toToken}
                      chain={manager.toChain as any}
                    />{" "}
                    <div className="font-extrabold text-foreground text-[22px]">
                      {NumberFormatterUtils.toEth(
                        BigInt(manager?.route?.toAmount ?? 0),
                        manager?.route?.toToken?.decimals || 0,
                      )}
                    </div>
                  </div>

                  <div className="flex w-full py-1 items-center justify-between ">
                    <div className="w-full flex items-center justify-center">
                      <CiCircleCheck size={50} color="#00b472" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center w-full">
                    <Button
                      style={{ width: "100%" }}
                      onClick={() =>
                        exploreTx(
                          manager.lastTransactionHash ?? "",
                          manager.fromChain?.id ?? 0,
                        )
                      }
                      className=""
                    >
                      View on Blockchain
                    </Button>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: `${config.themeColor}20`,
                        color: config.themeColor,
                      }}
                      onClick={() =>
                        exploreLifiTx(manager.lastTransactionHash ?? "")
                      }
                      className=""
                    >
                      View on Lifi
                    </Button>
                  </div>
                </div>
              </TranslateY>
              <div className="w-full my-9">
                {
                  <Scale key={"fee-details"} condition={!!manager.route}>
                    {" "}
                    <FeeDetails route={manager.route as any} />
                  </Scale>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center">
          <Button
            style={{
              fontWeight: "bold",
              fontSize: "18px",
            }}
            onClick={async () => {
              const onClick = getButtonState().onClick;
              if (onClick) {
                await onClick();
              } else {
                console.error(onClick);
              }
            }}
          >
            {getButtonState().label}
          </Button>
        </div>
      </div>
    </>
  );
};

const StepRenderer = ({ e }: { e: OrderStep }) => {
  const isDone = e.status === Status.Done;
  const isFailed = e.status === Status.Failed;
  const isPending = e.status === Status.Pending;
  const name = e.name;
  function getIcon() {
    if (isDone) {
      return FaCircleCheck;
    } else if (isPending) {
      return BsInfoCircle;
    } else if (isFailed) {
      return VscError;
    }

    return CiNoWaitingSign;
  }
  function getColor() {
    if (isDone) {
      return "#00b472";
    } else if (isPending) {
      return "#00acf6";
    } else if (isFailed) {
      return "#ff526c";
    }

    return "#dc8900";
  }

  const Icon = React.useMemo(() => getIcon(), [e.status]);
  const color = React.useMemo(() => getColor(), [e.status]);

  return (
    <div className="flex w-full p-2 flex-col gap-2  ">
      <div className="flex gap-2 items-center ">
        <div>
          <Icon color={color} />
        </div>

        <div className="flex gap-1 text-muted-foreground font-bold">
          <div>{name}</div>
          <div>•</div>
          <div style={{ color: color }}>{e.status}</div>
        </div>
      </div>

      <div className="text-[12px]  border-l-[2px]  ml-3 pl-2  text-muted-foreground">
        {e.description}
      </div>
    </div>
  );
};

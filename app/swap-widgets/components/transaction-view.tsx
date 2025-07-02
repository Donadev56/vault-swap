import ThemeToggle from "./ui/theme-toogle";

import { StHeader } from "./ui/st-header";
import useWeb3 from "../hooks/useWeb3";

import React from "react";
import { OrderStep, Status, useOrderManager } from "../hooks/order-manager";
import { toast } from "sonner";
import { useModal } from "../hooks/modal-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaCircleCheck } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import { VscError } from "react-icons/vsc";
import { CiNoWaitingSign } from "react-icons/ci";
import { FeeDetails } from "./fees-details";
import { Blur, Scale } from "./ui/animated-components";
import { Button } from "./ui/buttons";

export const TransactionView = () => {
  const web3 = useWeb3();
  const manager = useOrderManager();
  const modal = useModal();
  console.log(manager.trExeState);
  console.log(manager.trGeneratorState);
  const isInit = React.useRef(false);

  const generateRoutes = async () => {
    try {
      await manager.generateSteps();
      await executeRoutes();
    } catch (error) {
      console.error(error);
      toast.error((error as any).toString());
    }
  };
  const executeRoutes = async () => {
    try {
      await manager.executeRouteSteps();
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
    if (!id) {
      return state;
    }
    if (executionState && executionState[id] === Status.Done) {
      state = { label: "Back", onClick: () => modal.hideModal };
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

              <div className="flex gap-2 my-2 w-full items-center justify-center"></div>
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

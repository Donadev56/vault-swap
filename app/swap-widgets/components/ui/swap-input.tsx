import { cn } from "@/lib/utils";
import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const SwapInputCard = ({ children, className, ...props }: DivProps) => {
  return (
    <div
      {...props}
      data-slot="swap-input-card"
      className={cn(
        "border rounded-2xl flex flex-col p-2 items-start w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

const SwapInputTitle = ({
  children,
  style,
  className,
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <div
      style={style}
      data-slot="swap-card-title"
      className={cn("font-bold p-2 w-full flex text-[16px]", className)}
    >
      {children}
    </div>
  );
};

const SwapInputContent = ({
  children,
  style,
  className,
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const childArray = React.Children.toArray(children);

  const avatar = childArray.find(
    (child) =>
      React.isValidElement(child) &&
      (child.props as any)["data-slot"] === "swap-avatar",
  );
  const mainElement = childArray.find(
    (child) =>
      React.isValidElement(child) &&
      (child.props as any)["data-slot"] === "swap-main-element",
  );
  return (
    <div
      style={style}
      className={cn("w-full gap-3 items-center flex  ", className)}
    >
      <div data-solt="swap-avatar" className="flex">
        {avatar}
      </div>
      <div
        style={style}
        data-slot="swap-main-element"
        className={cn(
          "flex  text-foreground/50 font-[500] text-[18px] w-full ",
        )}
      >
        {mainElement}
      </div>
    </div>
  );
};

const Icon = ({ ...props }: DivProps) => {
  return (
    <div data-slot={"swap-avatar"} {...props}>
      {props.children}
    </div>
  );
};

const Content = ({ ...props }: DivProps) => {
  return (
    <div data-slot={"swap-main-element"} {...props}>
      {props.children}
    </div>
  );
};

export { SwapInputCard, SwapInputContent, SwapInputTitle, Icon, Content };

import React from "react";
import { FixedSizeList as List } from "react-window";

type ListProps = React.ComponentProps<typeof List>;

export const SwapList = ({ ...props }: ListProps) => {
  return <List {...props}>{props.children}</List>;
};

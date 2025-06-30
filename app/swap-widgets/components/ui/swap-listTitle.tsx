import ListTitle from "@/components/ui/listTitle";

type ListTitleType = React.ComponentProps<typeof ListTitle>;
export const SwapListTitle = ({ ...props }: ListTitleType) => {
  return (
    <ListTitle
      {...props}
      leftStyle={{
        maxWidth: "70%",
        justifyContent: "start",
      }}
      titleStyle={{
        maxWidth: "100%",
        display: "flex",
      }}
      mainTextStyle={{
        maxWidth: "100%",
      }}
      subtitleStyle={{
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "flex",
      }}
      actionsStyle={{
        maxWidth: "20%",
        minWidth: "20%",
        width: "20%",
        display: "flex",
        justifyContent: "end",
      }}
    />
  );
};

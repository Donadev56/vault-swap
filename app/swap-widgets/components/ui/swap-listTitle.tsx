import ListTitle from "@/components/ui/listTitle";

type ListTitleType = React.ComponentProps<typeof ListTitle>;
export const SwapListTitle = ({ ...props }: ListTitleType) => {
  return (
    <ListTitle
      {...props}
      leftStyle={{
        maxWidth: "85%",
        justifyContent: "start",
      }}
      titleStyle={{
        maxWidth: "100%",
      }}
      mainTextStyle={{
        maxWidth: "70%",
      }}
      subtitleStyle={{
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "flex",
      }}
      actionsStyle={{
        maxWidth: "20%",
        width: "20%",
      }}
    />
  );
};

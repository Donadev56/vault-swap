import StAppBar from "@/components/ui/st-app-bar";
import { IconButton } from "./buttons";
import { NavigateBack } from "../../routes/routes-utils";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const StHeader = ({
  title,
  onBack,
}: {
  title: React.ReactNode;
  onBack?: () => void;
}) => {
  return (
    <StAppBar
      fixed={false}
      leadingStyle={{ minWidth: "80%" }}
      mainElementStyle={{ padding: 0 }}
      className="border-none p-0"
      leading={
        <IconButton onClick={() => (onBack ? onBack() : NavigateBack())}>
          <ArrowBackIosNewIcon style={{ width: 20 }} />
        </IconButton>
      }
      title={<div className="font-bold">{title}</div>}
    />
  );
};

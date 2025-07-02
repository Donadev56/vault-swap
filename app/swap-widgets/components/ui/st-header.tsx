import StAppBar from "@/components/ui/st-app-bar";
import { IconButton } from "./buttons";
import { NavigateBack } from "../../routes/routes-utils";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const StHeader = ({
  title,
  onBack,
  beforeBack,
}: {
  title: React.ReactNode;
  onBack?: () => void;
  beforeBack?: () => void;
}) => {
  function back() {
    if (beforeBack) {
      beforeBack();
    }
    NavigateBack();
  }
  return (
    <div className="flex w-full p-2 items-center ">
      <div>
        <IconButton onClick={() => (onBack ? onBack() : back())}>
          <ArrowBackIosNewIcon style={{ width: 20 }} />
        </IconButton>
      </div>
      <div className="w-full ml-[-40px] text-[18px] font-bold text-foreground/80 justify-center flex items-center">
        {title}
      </div>
    </div>
  );
};

import StAppBar from "@/components/ui/st-app-bar";
import ThemeToggle from "../components/ui/theme-toogle";
import { IconButton, StButton } from "../components/ui/buttons";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ListTitle from "@/components/ui/listTitle";
import { NavigateBack } from "../routes/routes-utils";
import { StHeader } from "../components/ui/st-header";
export const SwapSetting = () => {
  const settings = [
    {
      title: "Theme",
      onClick: () => console.log(),
      actions: <ThemeToggle />,
    },
  ];
  return (
    <div className="flex flex-col gap-3 w-full items-center">
      <StHeader title="Settings" />

      <div className="flex flex-col items-center w-full ">
        {settings.map((e) => {
          return (
            <ListTitle leading={""} title={e.title} actions={[e.actions]} />
          );
        })}
      </div>
    </div>
  );
};

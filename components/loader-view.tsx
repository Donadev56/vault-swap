import { Logo } from "./logo";

export const LoaderView = () => {
  return (
    <div
      style={{ backgroundColor: "#ffffff", minHeight: "100%", height: "100%" }}
      className="grid h-full min-h-full w-full place-items-center  "
    >
      <Logo color="black" size={100} />
    </div>
  );
};

"use client";
import { WidgetConfig } from "@lifi/widget";
import React, { useMemo } from "react";

type ConfigContextType = {
  colors: string[];
  themeColor: string;
  setThemeColor: (color: string) => void;
  LifiConfig: Partial<WidgetConfig>;
};
const initialState: ConfigContextType = {
  colors: [],
  themeColor: "",
  setThemeColor: (color) => null,
  LifiConfig: {},
};
const ConfigContext = React.createContext<ConfigContextType>(initialState);

export const CustomConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const preferedColorKey = "preferedColorTheme";
  const [preferedColor, setPreferedColor] = React.useState(() => {
    if (typeof localStorage != "undefined") {
      return localStorage.getItem(preferedColorKey) ?? "#5C67FF";
    }
    return "#5C67FF";
  });

  const LifiConfig = React.useMemo(() => {
    return {
      variant: "compact",
      subvariant: "split",
      poweredBy: "jumper",
      appearance: "system",
      sdkConfig: {
        apiUrl: "/api/lifi-proxy",
        integrator: "donadev",
      },

      fee: 0.025,
      theme: {
        colorSchemes: {
          light: {
            palette: {
              primary: {
                main: preferedColor,
              },
              secondary: {
                main: "#F5B5FF",
              },
            },
          },
          dark: {
            palette: {
              primary: {
                main: preferedColor,
              },
              secondary: {
                main: "#F5B5FF",
              },
            },
          },
        },
        typography: {
          fontFamily: "Inter, sans-serif",
        },
        container: {
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
          borderRadius: "16px",
        },
      },
    } as Partial<WidgetConfig>;
  }, [preferedColor]);

  const colors = ["#5C67FF", "#f7557c", "#00be8a", "#00acec"];

  const updateCurrentColor = (color: string) => {
    localStorage.setItem(preferedColorKey, color);
    setPreferedColor(color);
  };

  const state = {
    colors,
    themeColor: preferedColor,
    setThemeColor: updateCurrentColor,
    LifiConfig,
  };

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  );
};

export const useCustomLifiConfig = () => {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw Error("Provider context is missing");
  }

  return context;
};

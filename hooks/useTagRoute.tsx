import React from "react";

type TagRouteProviderType = {
  main: string;
  indexes: { [key: string]: number };
  children: React.ReactNode;
};

type TagRouteProviderState = {
  pageIndex: number;
  hash: string;
  history: string[];
  getCurrentHash: () => string;
  navigate: (path: string) => void;
  pop: () => void;
};

const initConfig: TagRouteProviderState = {
  pageIndex: 0,
  hash: "",
  history: [],
  getCurrentHash: () => "",
  navigate() {},
  pop() {},
};
const TagProviderContext =
  React.createContext<TagRouteProviderState>(initConfig);

export const TagRouteProvider = ({
  main,
  indexes,
  children,
  ...props
}: TagRouteProviderType) => {
  if (typeof window == "undefined") {
    throw "Window is not defined";
  }

  const getCurrentHash = () => {
    const currentHash = window.location.hash;
    if (currentHash.length == 0) {
      return "#";
    }
    return currentHash;
  };

  const [pageIndex, setPageIndex] = React.useState(0);
  const [hash, setHash] = React.useState<string>(() => getCurrentHash());
  const [history, setHistory] = React.useState<string[]>([]);

  const navigate = (path: string) => {
    const targetHash = path.length == 0 ? main : path;
    const currentPath = getCurrentHash();
    if (currentPath.trim().toLocaleLowerCase() !== targetHash) {
      window.location.hash = targetHash;
    } else {
      handleHashChange();
    }
  };

  const pop = () => {
    if (history.length == 0) {
      navigate(main);
      return;
    }
    const list = [...history];
    const deleled = list.pop();
    const targetHash = list.pop();

    console.log("Deleted :", deleled);
    setHistory(list);
    navigate(targetHash ?? "");
  };

  const handleHashChange = () => {
    const targetHash = getCurrentHash();
    setHistory((last) => [...last, targetHash]);
    setHash(targetHash);
    setPageIndex(indexes[targetHash] ?? pageIndex);
  };

  React.useEffect(() => {
    navigate("#");
  }, []);

  React.useEffect(() => {
    const currentHash = getCurrentHash();
    navigate(currentHash);

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const value: TagRouteProviderState = {
    hash,
    navigate,
    getCurrentHash,
    pop,
    history,
    pageIndex,
  };
  return (
    <TagProviderContext.Provider {...props} value={value}>
      {children}
    </TagProviderContext.Provider>
  );
};

export const useTagRouter = () => {
  const context = React.useContext(TagProviderContext);

  if (context === undefined)
    throw new Error("useTagRouter must be used within a ThemeProvider");

  return context;
};

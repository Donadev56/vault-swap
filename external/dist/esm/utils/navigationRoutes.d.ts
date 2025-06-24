export declare const navigationRoutes: {
  home: string;
  activeTransactions: string;
  bridges: string;
  exchanges: string;
  fromChain: string;
  fromToken: string;
  languages: string;
  routes: string;
  settings: string;
  toChain: string;
  toToken: string;
  toTokenNative: string;
  transactionDetails: string;
  transactionExecution: string;
  transactionHistory: string;
  sendToWallet: string;
  bookmarks: string;
  recentWallets: string;
  connectedWallets: string;
  configuredWallets: string;
};
export declare const navigationRoutesValues: string[];
export declare const stickyHeaderRoutes: string[];
export declare const backButtonRoutes: string[];
export type NavigationRouteTypeKeys = keyof typeof navigationRoutes;
export type NavigationRouteType =
  (typeof navigationRoutes)[NavigationRouteTypeKeys];

export type Token = {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
};

export type FeeCost = {
  name: string;
  description: string;
  token: Token;
  amount: string;
  amountUSD: string;
  percentage: string;
  included: boolean;
};

export type GasCost = {
  type: string;
  price: string;
  estimate: string;
  limit: string;
  amount: string;
  amountUSD: string;
  token: Token;
};

export type Estimate = {
  tool: string;
  approvalAddress?: string;
  fromAmount: string;
  toAmount: string;
  toAmountMin?: string;
  feeCosts?: FeeCost[];
  gasCosts?: GasCost[];
  executionDuration?: number;
  fromAmountUSD?: string;
  toAmountUSD?: string;
};

export type Action = {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  fromChainId: number;
  toChainId: number;
  slippage?: number;
  fromAddress: string;
  toAddress: string;
  destinationGasConsumption?: string;
};

export type Step = {
  id: string;
  type: string;
  tool?: string;
  toolDetails?: {
    key: string;
    name: string;
    logoURI: string;
  };
  action: Action;
  estimate: Estimate;
  includedSteps?: Step[];
};

export type ExecutionProcess = {
  type: string;
  status: string;
  chainId: number;
  message: string;
  startedAt: number;
  doneAt?: number;
  actionRequiredAt?: number;
  pendingAt?: number;
  substatus?: string;
  substatusMessage?: string;
  txHash?: string;
  txLink?: string;
  txType?: string;
};

export type Execution = {
  status: string;
  process: ExecutionProcess[];
  startedAt: number;
  doneAt: number;
  fromAmount: string;
  toAmount: string;
  toToken: Token;
  gasCosts: GasCost[];
};

export type TransactionRequest = {
  value: string;
  to: string;
  data: string;
  from: string;
  chainId: number;
  gasPrice: string;
  gasLimit?: string;
};

export type Transaction = {
  id: string;
  fromChainId: number;
  fromAmountUSD: string;
  fromAmount: string;
  fromToken: Token;
  fromAddress: string;
  toChainId: number;
  toAmountUSD: string;
  toAmount: string;
  toAmountMin: string;
  toToken: Token;
  toAddress: string;
  gasCostUSD: string;
  containsSwitchChain: boolean;
  steps: Step[];
  integrator?: string;
  execution?: Execution;
  transactionRequest?: TransactionRequest;
};

export type Chain = {
  key: string;
  chainType: "EVM" | string;
  name: string;
  coin: string;
  id: number;
  mainnet: boolean;
  logoURI: string;
  tokenlistUrl: string;
  faucetUrls?: string[];
  multicallAddress: string;
  relayerSupported: boolean;
  metamask: MetamaskConfig;
  nativeToken: NativeToken;
  diamondAddress: string;
  permit2: string;
  permit2Proxy: string;
};

export type MetamaskConfig = {
  chainId: string;
  blockExplorerUrls: string[];
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
};

export type NativeToken = {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
};

export type ChainsResponse = {
  chains: Chain[];
};

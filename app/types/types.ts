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

interface ToolDetails {
  key: string;
  name: string;
  logoURI: string;
  webUrl?: string;
}

interface IncludedStep {
  tool: string;
  toolDetails: ToolDetails;
  fromAmount: string;
  fromToken: Token;
  toToken: Token;
  toAmount: string;
  bridgedAmount: string | null;
}

interface TransferAction {
  txHash: string;
  txLink: string;
  token: Token;
  chainId: number;
  gasPrice: string;
  gasUsed: string;
  gasToken: Token;
  gasAmount: string;
  gasAmountUSD: string;
  amountUSD: string;
  value: string;
  includedSteps?: IncludedStep[];
  amount: string;
  timestamp: number;
}

interface Metadata {
  integrator: string;
}

interface Transfer {
  transactionId: string;
  sending: TransferAction;
  receiving: TransferAction;
  lifiExplorerLink: string;
  bridgeExplorerLink?: string;
  fromAddress: string;
  toAddress: string;
  tool: string;
  status: string;
  substatus: string;
  substatusMessage: string;
  metadata: Metadata;
  feeCosts: FeeCost[];
}

interface TransfersData {
  transfers: Transfer[];
}

type FeeBalancesResponse = {
  integratorId: string;
  feeBalances: FeeBalance[];
};

type FeeBalance = {
  chainId: number;
  tokenBalances: TokenBalance[];
};

type TokenBalance = {
  token: TokenInfo;
  amount: string;
  amountUsd: string;
};

type TokenInfo = {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
};

export {
  type Transfer,
  type TransferAction,
  type TransfersData,
  type Metadata,
  type IncludedStep,
  type TokenInfo,
  type TokenBalance,
  type FeeBalance,
  type FeeBalancesResponse,
};

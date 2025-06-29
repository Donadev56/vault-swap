import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const systemPrompt = `
You are a professional AI assistant embedded in VaultSwap the website is vswap.io, a decentralized exchange that uses the LiFiWidget to power cross-chain SWAP and BRIDGE operations. Your role is to guide users step-by-step through trading crypto assets based on the selected operation tab: "Swap" or "Bridge". VaultSwap uses intelligent routing, and minimum amounts depend on available routes and liquidity.

Behave as a friendly expert assistant, simplifying the user journey while maintaining accuracy and security.

---

👥 GENERAL USER FLOW:

1. Users choose between two tabs: "SWAP" or "BRIDGE". Based on the selected tab, the assistant logic differs.

---

🔄 IF USER SELECTS **SWAP** TAB:

1. Prompt user to **select the blockchain** (Chain From).
2. Prompt user to **select the token** on the source chain (Token From).
3. After "Token From" is selected, prompt user to:
   - Select **destination token** (Token To), on the same or compatible chain.
   - Input **amount** to swap.
4. Use LiFiWidget to fetch available swap routes (there is no fixed minimum; it depends on routing).
5. Guide user through:
   - Approvals (if needed)
   - Swap preview (estimated output, slippage, fees, duration)
   - Wallet signature process
6. Monitor and report transaction status.
7. Confirm completion or show fallback suggestions if routing fails.

---

🌉 IF USER SELECTS **BRIDGE** TAB:

1. Prompt user to **select source chain** (Chain From).
2. Prompt user to **select token** on the source chain (Token From).
3. Then prompt for **destination chain** (Chain To).
4. Prompt for **token to receive** on the destination chain (Token To).
5. User enters the **amount** to bridge.
6. Ask if the user wants to receive crypto in their current wallet or set a **custom recipient address**:
   - If yes, guide them to use the "Wallet" button to input the recipient address.
7. Fetch bridge routes with LiFiWidget.
8. Show full route preview (fees, timing, bridges used, etc.).
9. Guide through approval, wallet signing, and transaction confirmation.
10. Notify when assets are bridged and confirm on-chain receipt.

---

⚠️ EXTRA BEHAVIOR GUIDELINES:

- Never assume. Always prompt clearly for missing info.
- Adapt instructions to user's experience level (basic to advanced).
- Use LiFiWidget SDK/API logic to validate routes, fees, and token compatibility.
- Notify users when a route is unavailable or fails.
- Explain why certain routes or tokens may not appear (e.g., no liquidity, unsupported pair).
- Prompt network switching when needed and guide through wallet prompts.

---

💬 EXAMPLE INTERACTION:

User: "I want to bridge 50 USDT from Arbitrum to Polygon to a different wallet."
Assistant: "Sure! Let's start by selecting Arbitrum as your source chain and USDT as your token. Then select Polygon as the destination chain and choose the token to receive. After entering 50 USDT, click the 'Wallet' button to specify the receiving address. I’ll fetch the best bridging route for you now."

You are the user's intelligent and secure trading guide through VaultSwap's swap and bridge flows.

Admin contact : t.me/@Opennode_tech
`;

export const RpcUrls = {
  1: [
    "https://api.mycryptoapi.com/eth",
    "https://cloudflare-eth.com",
    "https://ethereum-rpc.publicnode.com",
    "https://mainnet.gateway.tenderly.co",
    "https://rpc.blocknative.com/boost",
    "https://rpc.flashbots.net",
    "https://rpc.flashbots.net/fast",
    "https://rpc.mevblocker.io",
    "https://rpc.mevblocker.io/fast",
    "https://rpc.mevblocker.io/noreverts",
    "https://rpc.mevblocker.io/fullprivacy",
    "https://eth.drpc.org",
    "https://api.securerpc.com/v1",
  ],
  10: [
    "https://mainnet.optimism.io",
    "https://optimism-rpc.publicnode.com",
    "https://optimism.gateway.tenderly.co",
    "https://optimism.drpc.org",
  ],
  25: [
    "https://evm.cronos.org",
    "https://cronos-evm-rpc.publicnode.com",
    "https://cronos.drpc.org",
  ],
  30: ["https://public-node.rsk.co", "https://mycrypto.rsk.co"],
  50: [
    "https://erpc.xinfin.network",
    "https://rpc.xinfin.network",
    "https://rpc1.xinfin.network",
    "https://rpc.xdcrpc.com",
    "https://erpc.xdcrpc.com",
    "https://rpc.ankr.com/xdc",
    "https://rpc.xdc.org",
  ],
  56: [
    "https://bsc-dataseed1.bnbchain.org",
    "https://bsc-dataseed2.bnbchain.org",
    "https://bsc-dataseed3.bnbchain.org",
    "https://bsc-dataseed4.bnbchain.org",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed2.defibit.io",
    "https://bsc-dataseed3.defibit.io",
    "https://bsc-dataseed4.defibit.io",
    "https://bsc-dataseed1.ninicoin.io",
    "https://bsc-dataseed2.ninicoin.io",
    "https://bsc-dataseed3.ninicoin.io",
    "https://bsc-dataseed4.ninicoin.io",
    "https://bsc-rpc.publicnode.com",
  ],
  100: [
    "https://rpc.gnosischain.com",
    "https://rpc.gnosis.gateway.fm",
    "https://rpc.ankr.com/gnosis",
    "https://gnosischain-rpc.gateway.pokt.network",
    "https://gnosis-mainnet.public.blastapi.io",
    "https://gnosis.api.onfinality.io/public",
    "https://gnosis.blockpi.network/v1/rpc/public",
    "https://web3endpoints.com/gnosischain-mainnet",
    "https://gnosis.oat.farm",
    "https://gnosis-rpc.publicnode.com",
  ],
  122: ["https://rpc.fuse.io", "https://fuse.drpc.org"],
  130: ["https://mainnet.unichain.org", "https://unichain-rpc.publicnode.com"],
  137: [
    "https://polygon-rpc.com/",
    "https://rpc-mainnet.matic.network",
    "https://matic-mainnet.chainstacklabs.com",
    "https://rpc-mainnet.maticvigil.com",
    "https://rpc-mainnet.matic.quiknode.pro",
    "https://matic-mainnet-full-rpc.bwarelabs.com",
    "https://polygon-bor-rpc.publicnode.com",
    "https://polygon.gateway.tenderly.co",
    "https://polygon.drpc.org",
  ],
  146: ["https://rpc.soniclabs.com", "https://sonic-rpc.publicnode.com"],
  204: [
    "https://opbnb-mainnet-rpc.bnbchain.org",
    "https://opbnb-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
    "https://opbnb-mainnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5",
    "https://opbnb-rpc.publicnode.com",
    "https://opbnb.drpc.org",
  ],
  232: ["https://rpc.lens.xyz"],
  250: [
    "https://rpc.ftm.tools",
    "https://fantom-rpc.publicnode.com",
    "https://fantom.drpc.org",
  ],
  288: [
    "https://mainnet.boba.network",
    "https://replica.boba.network",
    "https://boba-ethereum.gateway.tenderly.co",
    "https://gateway.tenderly.co/public/boba-ethereum",
    "https://boba-eth.drpc.org",
  ],
  324: ["https://mainnet.era.zksync.io", "https://zksync.drpc.org"],
  480: [
    "https://worldchain-mainnet.g.alchemy.com/public",
    "https://480.rpc.thirdweb.com",
    "https://worldchain-mainnet.gateway.tenderly.co",
  ],
  999: ["https://gwan-ssl.wandevs.org:46891/"],
  1088: [
    "https://andromeda.metis.io/?owner=1088",
    "https://metis.drpc.org",
    "https://metis-rpc.publicnode.com",
  ],
  1101: ["https://zkevm-rpc.com", "https://polygon-zkevm.drpc.org"],
  1135: ["https://rpc.api.lisk.com"],
  1284: [
    "https://rpc.api.moonbeam.network",
    "https://moonbeam.public.blastapi.io",
    "https://moonbeam-rpc.dwellir.com",
    "https://moonbeam.api.onfinality.io/public",
    "https://moonbeam.unitedbloc.com",
    "https://moonbeam-rpc.publicnode.com",
    "https://moonbeam.drpc.org",
  ],
  1285: [
    "https://rpc.api.moonriver.moonbeam.network",
    "https://moonriver.public.blastapi.io",
    "https://moonriver-rpc.dwellir.com",
    "https://moonriver.api.onfinality.io/public",
    "https://moonriver.unitedbloc.com",
    "https://moonriver-rpc.publicnode.com",
    "https://moonriver.drpc.org",
  ],
  1329: ["https://evm-rpc.sei-apis.com"],
  1625: ["https://rpc.gravity.xyz", "https://rpc.ankr.com/gravity"],
  1868: ["https://rpc.soneium.org"],
  1923: ["https://swell-mainnet.alt.technology", "https://rpc.ankr.com/swell"],
  2741: ["https://api.mainnet.abs.xyz"],
  5000: ["https://rpc.mantle.xyz", "https://mantle-rpc.publicnode.com"],
  8217: ["https://public-en.node.kaia.io"],
  8453: [
    "https://mainnet.base.org/",
    "https://developer-access-mainnet.base.org/",
    "https://base.gateway.tenderly.co",
    "https://base-rpc.publicnode.com",
  ],
  13371: ["https://rpc.immutable.com", "https://immutable-zkevm.drpc.org"],
  33139: ["https://rpc.apechain.com"],
  34443: ["https://mainnet.mode.network", "https://mode.drpc.org"],
  42161: [
    "https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}",
    "https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}",
    "https://arb1.arbitrum.io/rpc",
    "https://arbitrum-one-rpc.publicnode.com",
  ],
  42220: ["https://forno.celo.org"],
  43114: [
    "https://api.avax.network/ext/bc/C/rpc",
    "https://avalanche-c-chain-rpc.publicnode.com",
  ],
  55244: ["https://rpc.superposition.so"],
  57073: ["https://rpc-gel.inkonchain.com", "https://rpc-qnd.inkonchain.com"],
  59144: [
    "https://rpc.linea.build",
    "https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}",
    "https://linea-rpc.publicnode.com",
  ],
  60808: ["https://rpc.gobob.xyz", "https://bob-mainnet.public.blastapi.io"],
  80094: [
    "https://rpc.berachain.com",
    "https://berachain-rpc.publicnode.com",
    "https://rpc.berachain-apis.com",
  ],
  81457: [
    "https://rpc.blast.io",
    "https://rpc.ankr.com/blast",
    "https://blast.din.dev/rpc",
    "https://blastl2-mainnet.public.blastapi.io",
    "https://blast.blockpi.network/v1/rpc/public",
    "https://blast-rpc.publicnode.com",
  ],
  167000: ["https://rpc.mainnet.taiko.xyz", "https://taiko-rpc.publicnode.com"],
  534352: [
    "https://rpc.scroll.io",
    "https://rpc.ankr.com/scroll",
    "https://scroll-mainnet.chainstacklabs.com",
    "https://scroll-rpc.publicnode.com",
  ],
  21000000: [
    "https://mainnet.corn-rpc.com",
    "https://rpc.ankr.com/corn_maizenet",
    "https://maizenet-rpc.usecorn.com",
  ],
  1313161554: ["https://mainnet.aurora.dev", "https://aurora.drpc.org"],
};

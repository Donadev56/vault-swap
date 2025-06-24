

# ⚡ VaultSwap

VaultSwap is a powerful, non-custodial DEX aggregator powered by the [LiFi protocol](https://www.li.fi/), offering seamless cross-chain swaps and bridging with AI-powered support. Built with performance, simplicity, and extensibility in mind.

 
<img  src="https://vswap.io/images/v-logo.png" alt="V-swap" width="200"/>


OVERVIEW
---

![VSWAP EXAMPLE](https://vswap.io/images/v-example.gif)

---

## 🚀 Features

- 🌉 **Cross-Chain Swapping & Bridging** — Powered by LiFi SDK.
- 🤖 **AI Assistant** — Integrated support chat for user assistance.
- 📊 **Transaction History** — View saved swap and bridge history.
- 🧩 **Theme Customization** — Select your color scheme.
- 📱 **Mobile-Responsive** — Full support across devices.
- 🔐 **Non-Custodial** — Wallet-based interaction, no user data stored.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), React, TypeScript
- **UI & Styling:** Tailwind CSS, Lucide Icons, MUI
- **Blockchain & Web3:** [LiFi SDK](https://docs.li.fi/), EVM-compatible chains
- **Animations:** Framer Motion
- **Others:** React Icons, Dynamic Theming, Custom Hooks

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Donadev56/vault-swap.git
cd vault-swap
```

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Add in  `app/api/lifi-proxy/\[...path\]/route.ts`
the current code :

```ts
import { NextRequest, NextResponse } from  "next/server";

  

// Base URL of the actual LiFi API to proxy to

const  LIFI_API_BASE  =  "https://li.quest/v1";

  

export  async  function  GET(req:  NextRequest) {

return  await  forwardRequest(req);

}

  

export  async  function  POST(req:  NextRequest) {

return  await  forwardRequest(req);

}

  

async  function  forwardRequest(req:  NextRequest) {

try {

// Extract the path after /api/lifi-proxy/

// req.nextUrl.pathname = "/api/lifi-proxy/chains" for example

// We want the part after /api/lifi-proxy => "/chains"

const  urlPath  =  req.nextUrl.pathname.replace(/^\/api\/lifi-proxy/, "");

  

// Rebuild the full URL to the LiFi API including query params

const  targetUrl  =  new  URL(LIFI_API_BASE  +  urlPath);

  

targetUrl.search  =  req.nextUrl.search; // preserve query string

  

// Forward the request with original method and headers (you can customize headers as needed)

const  res  =  await  fetch(targetUrl.toString(), {

method:  req.method,

headers: {

"Content-Type":  "application/json",

"x-lifi-api-key":

"your-lifi-api-key", // Your API key from env

},

// If POST or other methods with body, forward the body as well

body: ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)

?  await  req.text()

:  undefined,

});

  

// Build NextResponse from the proxied response

const  responseBody  =  await  res.json(); // get response as text (can parse JSON if you want)

  

// Return response with status and headers from the original API

return  NextResponse.json(responseBody, { status:  res.status });

} catch (error) {

console.error("Proxy error:", error);

return  NextResponse.json({ error:  "Proxy failed" }, { status:  500 });

}

}
```



Visit `http://localhost:3000` to view the app.

---

## ⚙️ Environment Variables

Create a `.env.local` file and add the following:

```env
NEXT_PUBLIC_LIFI_API_KEY=your_api_key_here
# Add any other needed variables
```

> You can get an API key from [LiFi’s Developer Portal](https://docs.li.fi/).

---

## 📸 Screenshots

> On Mobile

<img  src="https://vswap.io/images/phone/1.png" alt="V-swap" height="400" />
 <img  src="https://vswap.io/images/phone/2.png" alt="V-swap" height="400" />


---

## ❓ FAQ

> Frequently asked questions are built directly into the app’s UI.

Here’s a few:

- **What chains are supported?**  
  VaultSwap supports Ethereum, Arbitrum, Polygon, Optimism, BNB Chain, and more.

- **Is VaultSwap secure?**  
  100%. It uses the audited LiFi protocol and operates in a non-custodial manner.

- **Do I need to connect a wallet?**  
  Yes — VaultSwap is Web3-native and requires MetaMask, WalletConnect, or similar.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or PR.

---

## 📬 Contact

For support or questions:

- Telegram: [@Opennode_tech](https://t.me/Opennode_tech)

---

## 🌐 Live Demo

> deployed at:  
**[VSWAP](https://vswap.io)** <!-- Replace with actual link -->


export class Web3Utils {
  static truncatedAddress = (address: string): string => {
    if (this.isAddressValid(address)) {
      return `${address.slice(0, 6)}...${address.slice(address.length - 6, address.length)}`;
    }

    return "Invalid address";
  };

  static isAddressValid = (address: string): boolean => {
    return address.startsWith("0x") && address.length == 42;
  };

  static async isRpcUrlAvailable(rpcUrl: string) {
    try {
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      return !!data.result;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  static async findAvailableRpc(rpcUrls: string[]) {
    try {
      for (const rpc of rpcUrls) {
        const isAvailable = await Web3Utils.isRpcUrlAvailable(rpc);
        if (isAvailable) {
          return rpc;
        }
      }
    } catch (error) {
      console.error(error);
      return rpcUrls[0];
    }
  }
}

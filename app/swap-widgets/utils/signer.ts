import Web3 from "web3";

export interface ResponseMessage {
  success: boolean;
  message: string;
}

class TransactionSigner {
  public web3: Web3;
  public ethereum: any;
  constructor(web3: Web3) {
    this.web3 = web3;
    this.ethereum = (window as any).ethereum;
  }

  signAndSendTransaction = async ({
    from,
    to,
    value,
    data,
  }: {
    from: string;
    to: string;
    value: number;
    data: string;
  }): Promise<ResponseMessage> => {
    try {
      const ethereum = this.ethereum;
      if (!ethereum) {
        throw Error("MetaMask not found");
      }
      const params = {
        from,
        to,
        value,
        data,
      };

      const estimatedGas = await (this.web3!.eth as any).estimateGas(params);

      console.log("estimate fees: ", estimatedGas);
      const gasLimit = Math.floor(Number(estimatedGas));

      console.log("Estimated gas:", estimatedGas);
      console.log("Adjusted gas limit:", gasLimit);

      const receipt = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            ...params,
            value: this.web3.utils.toHex(params.value),
            gas: this.web3.utils.toHex(gasLimit),
          },
        ],
      });

      if (receipt) {
        if (typeof receipt == "string") {
          return { success: true, message: receipt };
        } else {
          return { success: true, message: JSON.stringify(receipt) };
        }
      } else {
        throw Error("Failed to Register");
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: typeof error == "string" ? error : JSON.stringify(error),
      };
    }
  };
}

export default TransactionSigner;

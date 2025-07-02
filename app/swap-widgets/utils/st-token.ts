import Web3 from "web3";
import { TokenAbi } from "./st-token-abi";
import TransactionSigner from "./signer";
import { TransactionRequest } from "@lifi/sdk";

export class TokenStateLess {
  public contractAddress: string;
  public web3: Web3;

  constructor(web3: Web3, contractAddress: string) {
    this.contractAddress = contractAddress;
    this.web3 = web3;
  }

  createContract() {
    return new this.web3.eth.Contract(TokenAbi, this.contractAddress);
  }

  throwError(error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(typeof error == "string" ? error : JSON.stringify(error));
  }

  async totalSupply() {
    try {
      const contract = this.createContract();
      const supply = await contract.methods.totalSupply().call();
      return Number(supply) / 1e18;
    } catch (error) {
      this.throwError(error);
    }
  }

  async balanceOf(address: string) {
    try {
      const contract = this.createContract();
      const balance = await contract.methods.balanceOf(address).call();
      return balance as any as bigint;
    } catch (error) {
      this.throwError(error);
    }
  }

  async allowance(owner: string, spender: string) {
    try {
      const contract = this.createContract();
      const allowed = await contract.methods.allowance(owner, spender).call();
      return allowed as any as bigint;
    } catch (error) {
      this.throwError(error);
    }
  }
}

export class TokenStateFull extends TokenStateLess {
  async approve({
    address,
    amount = 100000 * 1e18,
  }: {
    amount?: number;
    address: string;
  }) {
    try {
      const signer = new TransactionSigner(this.web3);

      const contract = this.createContract();
      const ethereum = window.ethereum;
      if (!ethereum) {
        throw new Error("Metamask not detected");
      }

      const accounts: string[] = await ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      const txData = contract!.methods.approve(address, amount).encodeABI();
      const response = await signer.signAndSendTransaction({
        from: account,
        to: this.contractAddress,
        value: 0,
        data: txData,
      });

      if (response.success) {
        return response.message;
      }
      this.throwError(response.message);
    } catch (error) {
      this.throwError(error);
    }
  }

  async createApprovalTransaction({
    address,
    amount = 100000 * 1e18,
  }: {
    amount?: number;
    address: string;
  }) {
    try {
      const signer = new TransactionSigner(this.web3);

      const contract = this.createContract();
      const ethereum = window.ethereum;
      if (!ethereum) {
        throw new Error("Metamask not detected");
      }

      const accounts: string[] = await ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      const txData = contract!.methods.approve(address, amount).encodeABI();

      const params = {
        from: account,
        to: this.contractAddress,
        value: 0,
        data: txData,
      };

      const estimatedGas = await (this.web3!.eth as any).estimateGas(params);

      console.log("estimate fees: ", estimatedGas);
      const gasLimit = Math.floor(Number(estimatedGas));

      console.log("Estimated gas:", estimatedGas);
      console.log("Adjusted gas limit:", gasLimit);

      return {
        ...params,
        value: this.web3.utils.toHex(params.value),
        gas: this.web3.utils.toHex(gasLimit),
      } as TransactionRequest;
    } catch (error) {
      this.throwError(error);
    }
  }
}

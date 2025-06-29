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
}

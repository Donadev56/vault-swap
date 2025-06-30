import { Button as MuiButton } from "@mui/material";
import * as React from "react";
import { MainActionButton } from "./main-action-button";
import { useCustomLifiConfig } from "@/hooks/useCustomLifiConfig";
import WalletIcon from "@mui/icons-material/Wallet";
import useWeb3 from "../../hooks/useWeb3";
import { Web3Utils } from "../../utils/web3-utils";
import { toast } from "sonner";

type ButtonProps = React.ComponentProps<typeof MuiButton>;

const ConnectWalletButtonHeader = ({ ...props }: ButtonProps) => {
  const toastError = (message: string) => toast.error(message);

  const web3 = useWeb3();
  async function connect() {
    try {
      await web3.connect();
    } catch (error) {
      toastError((error as any).toString());
    }
  }
  return (
    <StButton onClick={connect} {...props}>
      <WalletIcon />{" "}
      {web3.isConnected && web3.account.length > 0
        ? Web3Utils.truncatedAddress(web3.account)
        : "Connect Wallet"}
    </StButton>
  );
};

const ConnectButton = ({ ...props }: ButtonProps) => {
  return <Button {...props}>Connect Wallet</Button>;
};

const Button = ({ ...props }: ButtonProps) => {
  const lifiConfig = useCustomLifiConfig();

  return (
    <MainActionButton
      {...props}
      style={{
        borderRadius: 10,
        backgroundColor: lifiConfig.themeColor,
        color: "var(--background)",
        ...props.style,
      }}
      className="font-bold"
      sx={{ textTransform: "none" }}
    >
      {props.children}
    </MainActionButton>
  );
};

const StButton = ({ ...props }: ButtonProps) => {
  return (
    <MuiButton
      {...props}
      style={{
        color: "var(--foreground)",
        borderRadius: 15,
        fontWeight: "bold",
        textTransform: "none",
        ...props.style,
      }}
      className="flex rounded-2xl font-bold text-foreground gap-2"
    >
      {props.children}
    </MuiButton>
  );
};

const IconButton = ({ size = 40 as any, ...props }: ButtonProps) => {
  return (
    <StButton
      {...props}
      style={{
        ...props.style,
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        maxWidth: size,
      }}
    ></StButton>
  );
};
export {
  ConnectButton,
  ConnectWalletButtonHeader,
  Button,
  StButton,
  IconButton,
};

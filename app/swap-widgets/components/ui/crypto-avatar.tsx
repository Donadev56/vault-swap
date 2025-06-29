import { ExtendedChain, Token } from "@lifi/sdk";
import { cn } from "@/lib/utils";

export const CryptoAvatar = ({
  size,
  token,
  chain,
  logoUri,
  chainLogoUri,
  useSkeletonChain,
  useSkeletonToken,
}: {
  token?: Token;
  size: number;
  chain?: ExtendedChain;
  logoUri?: string;
  chainLogoUri?: string;
  useSkeletonChain?: boolean;
  useSkeletonToken?: boolean;
}) => {
  const isUrlAvailable = !!token?.logoURI;
  const divider = 2;
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${logoUri || token?.logoURI})`,
        backgroundSize: "cover",
      }}
      className={cn(
        "flex rounded-full justify-center items-center font-bold text-muted-foreground  relative ",
        useSkeletonToken && "bg-[var(--second-color)]",
      )}
    >
      {useSkeletonToken || isUrlAvailable ? "" : (token?.name[0] ?? "U")}

      {(chain || useSkeletonChain) && (
        <div className="absolute left-[62%] top-[60%]">
          <div
            style={{
              width: size / divider,
              height: size / divider,
              backgroundImage: useSkeletonChain
                ? ""
                : `url(${chainLogoUri || chain?.logoURI})`,
              backgroundSize: "cover",
            }}
            className={cn(
              "flex border-background border-2 rounded-full justify-center items-center font-bold text-muted-foreground  relative ",
              useSkeletonChain && "bg-[var(--second-color)]",
            )}
          ></div>
        </div>
      )}
    </div>
  );
};

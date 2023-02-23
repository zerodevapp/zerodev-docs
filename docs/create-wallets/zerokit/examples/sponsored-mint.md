---
sidebar_position: 1
---

# Sponsored Mint Example

In this example we are using an NFT contract on Polygon Mumbai:
[0x34bE7f35132E97915633BC1fc020364EA5134863](https://mumbai.polygonscan.com/address/0x34bE7f35132E97915633BC1fc020364EA5134863).

```jsx
import { ConnectButton } from "zerokit";

import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
```
```jsx live folded zerokit
function SponsoredMintExample() {
  const { address, isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "mint",
    args: [address],
  });
  const { write: mint, isLoading, isSuccess } = useContractWrite(config);

  const { data: balance = 0, refetch } = useContractRead({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    if (isSuccess) {
        refetch();
    }
  }, [refetch, isSuccess]);

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column', gap: '1rem'}}>
      <ConnectButton label="Sponsored Mint" />
      {isConnected && (
        <>
          <strong style={{fontSize: '1.5rem'}}>NFT Count: {`${balance}`}</strong>
          <button
            disabled={isLoading}
            onClick={mint}
          >
            Gas-free Mint
          </button>
        </>
      )}
    </div>
  );
}

---
sidebar_position: 2
---

# Batch Transactions

## Demo

import BatchMintExample from '@site/src/components/BatchMintExample';

<BatchMintExample />

## Introduction

One great advantage of smart contract wallets is the ability to execute transactions in batches.  That is, you can execute multiple transactions as if it's a single transaction, so you get to save on confirmation time and gas costs.  It's also safer because these transactions either all execute or all revert, no in-between, which is a property known as "atomicity."

## API

### Ethers

```typescript
// signer is a ZeroDevSigner
// This will mint two NFTs at a time
await signer.execBatch([
  {
    to: nftAddress,
    data: nftContract.interface.encodeFunctionData("mint", [address]),
  },
  {
    to: nftAddress,
    data: nftContract.interface.encodeFunctionData("mint", [address]),
  },
])
```

<br />

Each object in the array for `execBatch` can have three keys:

- `to`: the contract you are interacting with
- `data`: the calldata
- `value`: the value of the transaction

### Wagmi

```typescript
import { usePrepareContractBatchWrite, useContractBatchWrite, useWaitForAATransaction  } from "@zerodevapp/wagmi";
```

```typescript live folded zerodev
function Component() {
  const { address, connector, isConnected } = useAccount()

  const MintButton = () => {
    const nftAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'
    const { config } = usePrepareContractBatchWrite({
        calls: [
            {
              address: nftAddress,
              abi: contractAbi,
              functionName: "mint",
              args: [address],
            }, {
              address: nftAddress,
              abi: contractAbi,
              functionName: "mint",
              args: [address],
            }
        ],
    })

    const { writeAsync: batchMint, isLoading, data } = useContractBatchWrite(config) 

    useWaitForAATransaction({
      wait: data ? data.wait : undefined,
      onSuccess() {
        alert("Transaction was successful.")
      },
      onError() {
        alert("Transaction was unsuccessful.")
      }
    })

    return (
      <button disabled={isLoading} onClick={batchMint}>
        {isLoading ? 'loading...' : 'Batch Example'}
      </button>
    )
  }

  if (isConnected) {
    return <MintButton />
  }
  return <RainbowKitConnectButton />
}
```
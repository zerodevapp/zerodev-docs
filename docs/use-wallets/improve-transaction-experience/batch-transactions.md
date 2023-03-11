---
sidebar_position: 3
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
const Component = () => {
 const { config } = usePrepareContractBatchWrite({
    args: [
      [
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
    ]
  })

  const { write: batchMint, isLoading, data } = useContractBatchWrite(config) 

  useWaitForAATransaction({
    wait: data?.wait,
    onSuccess() {
      console.log("Transaction was successful.")
    }
  })
  ...
  
}

```
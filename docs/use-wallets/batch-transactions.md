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
const txn = await ecdsaProvider.sendUserOperation([
  {
    target: "targetAddress1",
    data: "callData1",
    value: value1,
  },
  {
    target: "targetAddress2",
    data: "allData2",
    value: value2,
  },
])
```

<br />

Each object in the array for `execBatch` can have three properties:

- `to`: the contract you are interacting with
- `data`: the calldata
- `value`: the ETH value of the transaction (can be undefined)

### Wagmi

```typescript
import { usePrepareContractBatchWrite, useContractBatchWrite, useWaitForAATransaction  } from "@zerodev/wagmi";
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
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

### SDK

```typescript
const txn = await ecdsaProvider.sendUserOperation([
  {
    target: "targetAddress1",
    data: "callData1",
    value: value1,
  },
  {
    target: "targetAddress2",
    data: "callData2",
    value: value2,
  },
])
```

<br />

Each object in the array for `execBatch` can have three properties:

- `to`: the contract you are interacting with
- `data`: the calldata
- `value`: the ETH value of the transaction (can be undefined)

To encode the calldata, you can use Viem's `encodeFunctionData`, like this:

```typescript
import { encodeFunctionData, parseAbi } from 'viem'

const contractABI = parseAbi([
  'function mint(address _to) public',
])

const userOp = {
  target: contractAddress,
  data: encodeFunctionData({
    abi: contractABI,
    functionName: 'mint',
    args: [address],
  }),
}

// Batch two mints in one transaction
const { hash } = await ecdsaProvider.sendUserOperation([
  userOp,
  userOp,
])
```

### Wagmi

```typescript
import { usePrepareContractBatchWrite, useContractBatchWrite  } from "@zerodev/wagmi";
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
        enabled: true
    })

    const { sendUserOperation: batchMint, isLoading, data } = useContractBatchWrite(config) 

    useWaitForTransaction({
      hash: data ? data.hash : undefined,
      enabled: !!data,
      onSuccess() {
        console.log("Transaction was successful.")
      },
      onError() {
        alert("Transaction was unsuccessful.")
      }
    })

    return (
      <button disabled={isLoading} onClick={() => batchMint()}>
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
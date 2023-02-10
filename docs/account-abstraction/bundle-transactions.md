---
sidebar_position: 3
---

# Bundle Transactions

One great advantage of smart contract wallets is the ability to execute transactions in batches.  That is, you can execute multiple transactions as if it's a single transaction, so you get to save on confirmation time and gas costs.  It's also safer because these transactions either all execute or all revert, no in-between, which is a property known as "atomicity."

To execute transactions in batches, import the ZeroDev SDK:

```jsx
import * as zd from '@zerodevapp/sdk';
```

Then use the `execBatch` function with your signer (obtained through Wagmi's `useSigner` hook):

```jsx
// This will mint two NFTs at a time
await zd.execBatch(signer, [
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

import BatchMintExample from '@site/src/components/BatchMintExample';

<BatchMintExample />

<br />

Each object in the array for `execBatch` can have three keys:

- `to`: the contract you are interacting with
- `data`: the calldata
- `value`: the value of the transaction


---
sidebar_position: 2
---

# Send Transactions

In the context of ERC-4337, transactions are known as "user operations," or "userops" for short.

## Contract Interactions

To interact with a contract, use the `sendUserOperation` function:

```javascript
const { hash } = await ecdsaProvider.sendUserOperation({
  target: contractAddress,
  data: functionData,
  value: value,
})

// If you want to wait for the UserOp to complete
await ecdsaProvider.waitForUserOperationTransaction(hash)
```

Just like a normal transaction, a UserOp consists of a target (the account or contract you want to interact with), a function calldata, and the ETH value attached to the transaction.

To easily encode function calldata, you can use Viem's helper functions like this:

```javascript
const { encodeFunctionData, parseAbi } = require('viem')

const contractABI = parseAbi([
  'function mint(address _to) public',
])

const { hash } = await ecdsaProvider.sendUserOperation({
  target: contractAddress,
  data: encodeFunctionData({
    abi: contractABI,
    functionName: 'mint',
    args: [address],
  }),
})
```

## Transferring ETH

Simply set `data` to `0x` if you want to transfer ETH (or whatever native token):


```javascript
const { hash } = await ecdsaProvider.sendUserOperation({
  target: receiverAddress,
  data: '0x',
  value: amount,
})
```

## Trasferring ETH with Wagmi

Simply set `data` to `0x` if you want to transfer ETH (or whatever native token):


```javascript
import { usePrepareSendUserOperation, useSendUserOperation } from "@zerodev/wagmi";
import { useWaitForTransaction } from "wagmi";
 
// Prepare the tx
const { config } = usePrepareSendUserOperation({
  to: receiverAddress,
  data: '0x',
  value: amount
});

const { sendUserOperation, data } = useSendUserOperation(config);

// Wait on the status of the tx
useWaitForTransaction({
  hash: data?.hash,
  enabled: !!data,
  onSuccess(data) {
    console.log("Transaction was successful.")
  }
})

// Send the tx
sendUserOperation();
```

## Ethers API

:::warning
The Ethers API is considered unstable and you might run into unexpected bugs.
:::

ZeroDev uses [Viem](https://viem.sh/) by default, but if your project uses [Ethers](https://docs.ethers.org/v5/), you could use the ZeroDev wallet object as an Ethers provider & signer:

```javascript
const {
  ZeroDevEthersProvider,
} = require('@zerodev/sdk')

// Use the function `ZeroDevEthersProvider` to create an Ethers provider
const provider = await ZeroDevEthersProvider.init('ECDSA', {
  projectId,
  // ...other settings 
})

// Get the signer from the Ethers provider
const signer = provider.getAccountSigner()
```

From here on, you can use the Ethers signer as you would expect.  For example, to interact with contracts:

```javascript
const nftContract = new Contract(contractAddress, contractABI, signer)
const receipt = await nftContract.mint(address)
await receipt.wait()
```

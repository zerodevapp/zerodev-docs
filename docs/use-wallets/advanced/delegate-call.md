---
sidebar_position: 4
---

# Delegate Call

One superpower that ZeroDev wallets have is [`delegatecall`](https://solidity-by-example.org/delegatecall/).  Since ZeroDev wallets are smart contract wallets, they are able to *delegate* their execution to other contracts.  This essentially allows the wallets' functionality to be infinitely extended.

As an example, say you want to, in a single transaction, sell a number of USDC for ETH, and then stake all the ETH via Lido.

If you had read the tutorial on [batching](/use-wallets/batch-transactions), you might think that you can do this via a batch.  The challenge, however, is that the amount of ETH you obtain from selling USDC is not precisely known until the sale is executed, so you wouldn't be able to precisely determine how much ETH you would be staking, at the time you execute the batch.

With `delegatecall`, however, you would be able to write a contract like this (in pseudo-solidity):

```solidity
contract SellAndStake {
  function execute(uint256 usdcAmount) public {
    uint256 ethAmount = uniswap.sellUSDC(usdcAmount);
    lido.stake(ethAmount)
  }
}
```

And then you'd `delegatecall` this contract from your wallet:

```typescript
const signer = await getZeroDevSigner(...)
const delegateSigner = signer.delegateCopy()
const sellAndStakeContract = new ethers.Contract(address, abi, delegateSigner)
await sellAndStakeContract.execute(usdcAmount)
```

Therefore, one way to think about `delegatecall` is that it's batching on steroids -- you can use the result from each step of the batch in later steps.  Unlike batching, however, `delegatecall` requires you to write and deploy the smart contract you are delegating to, so it's mostly suitable for advanced multi-step transactions, while batching would suffice for simple multi-step transactions.

## API

### Ethers

```typescript
// signer is an instance of ZeroDevSigner
const tx = await signer.execDelegateCall({
  to: contract.address,
  data: contract.interface.encodeFunctionData('functionName', [arg1, arg2]),
})
const receipt = await tx.wait()
```

- `signer` is an instance of `ZeroDevSigner`
- `contract` is an instance of Ethers `Contract`.  This is the contract you are delegating to.
- `functionName` and `arg1`/`arg2` should be replaced with the actual function name and arguments.
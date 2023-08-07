---
sidebar_position: 1
sidebar_label: Overview
---

# Creating Smart Wallets

In this document, we describe the general flow for creating a ZeroDev wallet.  Let's start by looking at the code:

```typescript
import { ECDSAValidator } from "@zerodevapp/sdk";
import { PrivateKeySigner } from "@alchemy/aa-core";

// The validator
const ecdsaProvider = await ECDSAProvider.init({
  // ZeroDev projectId
  projectId,
  // The signer
  owner: PrivateKeySigner.privateKeyToAccountSigner(PRIVATE_KEY),
  // The paymaster
  opts: {
      paymasterConfig: {
          policy: "VERIFYING_PAYMASTER"
      }
  },
});
```

As the code shows, we need to specify three things when creating a ZeroDev wallet: validator, signer(s), and paymaster.

- Validator: how does this wallet validate transactions?
- Signer(s): who will be signing transactions?
- Paymaster: how will this wallet pay for gas?

Let's dive in.

## Choosing a validator

Regular EOAs validate transactions by checking their ECDSA signatures.  With AA, however, you have the flexibility to choose different validation methods.  In ZeroDev, each different validation method is implemented with a smart contract known as a "validator."  You can read more about ZeroDev's modular architecture [here](/extend-wallets/overview).

The most commonly used validator is a ECDSA validator.  It basically replicates the behavior of an EOA where transactions are signed with a single ECDSA private key.

However, [many other validators](/extend-wallets/example-plugins) are available, such as multisig, recoverable ECDSA, etc.  We use the ECDSA validator as the default example throughout the docs since it's the most popular.

In the ZeroDev SDK, a wallet is typically accessed through an abstraction known as a "provider," not unlike how in Ethers you access wallets through an [Ethers provider](https://docs.ethers.org/v5/api/providers/).  Each validator has its own provider class, so to create a wallet with an ECDSA validator you would do:

```typescript
const ecdsaProvider = await ECDSAProvider.init(...)
```

## Choosing a signer

Signers are objects that can sign transactions.  In the case of a ECDSA validator, only one signer is needed, but other validators could require more than one signers, such as a multisig validator.

One common misunderstanding of AA wallets is that they are inherently non-custodial.  In fact, whether a wallet is custodial or not has nothing to do with whether it's AA -- it's the **signer** that determines whether the wallet is custodial.  If only the user controls their signer, then the wallet can be said as non-custodial.  If the signer is controlled by a third party, then the wallet would be custodial.

ZeroDev has support for both [custodial](/create-wallets/custodial) and [non-custodial](/category/noncustodial-wallets) signers, as well as a large number of [third-party signer integrations](/category/integrations) so you can use ZeroDev with popular Wallet-as-a-Service (WaaS) offerings such as Magic and Web3Auth.

To specify the signer for the ECDSA validator, use the `owner` flag:

```typescript
const ecdsaProvider = await ECDSAProvider.init({
  owner: PrivateKeySigner.privateKeyToAccountSigner(PRIVATE_KEY),
  // other params...
});
```

In this example, we use a [private key signer](/create-wallets/noncustodial/private-keys) which signs transactions using a private key, similar to how MetaMask works.

## Choosing a paymaster

With a regular wallet, the wallet pays for its own gas.  In other words, if the wallet has no ETH (or whatever token native to the network), the wallet cannot send any transactions.

An AA wallet like ZeroDev can leverage *paymasters* -- smart contracts that pay gas for the user, thus enabling the wallet to send transactions even if it doesn't have ETH.

There are many kinds of paymasters, but the most popular ones are:

- Verifying paymaster: this paymaster pays gas if it can verify that the transaction has been approved by the operator of the paymaster.  Presumably, the operator pays for the transaction due to some off-chain arrangements.  With ZeroDev, we let you use the verifying paymaster to sponsor gas for your users.

- ERC20 paymaster: this paymaster pays gas for a transaction in exchange for ERC20 tokens (such as USDC), thus effectively enabling the user to pay gas with ERC20 tokens.

In this example, we use the verifying paymaster.  You can [set up gas sponsoring "policies" in the dashboard](/use-wallets/pay-gas-for-users) to configure the conditions under which the paymaster will sign and therefore pay for the transaction.  Note that the ZeroDev SDK actually uses the verifying paymaster by default, so you don't technically have to specify this option.

```typescript
const ecdsaProvider = await ECDSAProvider.init({
  // The paymaster
  opts: {
      paymasterConfig: {
          policy: "VERIFYING_PAYMASTER"
      }
  },
  // other params...
});
```

## FAQs

### Do I pay gas when I create a ZeroDev wallet?

As you know, AA wallets are smart contract wallets.  However, when you "create" a wallet with the SDK, the wallet is not actually deployed.  Rather, its address is computed "counterfactually" (using [`CREATE2`](https://docs.openzeppelin.com/cli/2.8/deploying-with-create2) under the hood), meaning that you know your AA wallet's address even though it hasn't been deployed yet.  Therefore, "creating" a ZeroDev wallet and getting an address actually doesn't use any gas, and you can display the address to the user, send assets to the address, etc.

The AA wallet is only actually deployed when you send the first transaction with the wallet.  The wallet deployment happens atomically with the first transaction, so from your user's perspective they are still just sending one transaction, except that the first transaction is going to cost a little more since it includes the deployment cost.

### Who has custody of the ZeroDev wallet?

It's a common misconception that AA wallets are inherently non-custodial.  In fact, whether a wallet is AA or not has nothing to do with whether it's custodial.  It's the signers that determine whether a wallet is custodial.

That is, if you use a non-custodial signer such as local private keys to manage your AA wallet, then it's non-custodial.  At the same time, if you use a custodial key provider such as Fireblocks to manage your AA wallet, then it's custodial.

In any case, whoever has custody over the signers has custody over the wallet.
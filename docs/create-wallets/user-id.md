---
sidebar_position: 4
---

# Create Wallets with User IDs

If you already have existing Web2 users, and you simply want to create a Web3 wallet for each user, you can create custodial ZeroDev wallets that are identified by unique identifiers (IDs) from your application. 

But wait, did I just say "custodial?" Isn't that the worst??

The beauty of ZeroDev wallets is that they can be progressively non-custodial.  To understand how that's possible, we need to clear up a few concepts.

## Key vs Account

When we talk about a "wallet," we are actually talking about two things:

- `Key`: the cryptographic key used for signing messages and transactions for the account.
- `Account`: the blockchain entity identified by an address, a balance, and other state.

For an *externally owned account* (EOA), e.g. a MetaMask account, the account address is cryptographically link to the key.  Therefore, it's not possible to change the key for an account.  In other words, for EOAs, 1 key == 1 account.

AA wallets like ZeroDev are smart contract accounts, however.  A smart contract account has its own address, which is independent of the key that manages it.  As a result, it's possible to *replace* the key with another key, without changing the blockchain address of the account at all.

In this article we will show how to create AA wallets with user IDs.  To learn how to let users take control with their own keys, see [Replace Wallet Owner](/use-wallets/replace-wallet-owner).

## API

### Ethers

```typescript
import { getZeroDevSigner, UserIdOwner } from '@zerodevapp/sdk'

// TODO: this isn't secure since the project ID can leak on the client side
// and then anyone would be able to take over anyone's wallet.
// Instead, we need to use something like SAPI, along with a server-only
// secret key, so the dev can generate a one-time API key on the server and
// pass it to the frontend

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: new UserIdOwner("<user id>"),
})
```

Note that the user ID can be string, but it has to be unique within your project.

### Wagmi

To connect to your wallet via `User ID` you can use the universal ZeroDevConnector and pass the `owner` using the `UserIdOwner` initiator.
```
import { ZeroDevConnector, type AccountParams } from '@zerodevapp/wagmi'
import { UserIdOwner } from '@zerodevapp/sdk'

const connector = new ZeroDevConnector({chains, {
  projectId: <your-project-id>,
  owner: UserIdOwner("<user id>"),
}})
```
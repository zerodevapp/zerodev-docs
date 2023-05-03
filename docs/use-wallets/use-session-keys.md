---
sidebar_position: 3
---

# Use session keys

**Session keys** are one of the most powerful features of ZeroDev wallets.  It has many applications, some of them we probably haven't even thought of, so it's well worth the time to understand what you can do with them and see if they can benefit your application.

## What are session keys?

With a traditional EOA wallet, there's only one key -- the *private key* that is able to sign any transactions for the wallet.  In other words, if you own the key, you own the wallet.  That's why it's so critical that you do not ever lose or reveal your seed phrase, which is just the private key in a more memorable form.

With an account abstraction wallet such as ZeroDev, however, the wallet is decoupled from the key: the wallet owner can assign arbitrary keys the power to issue transactions on its behalf, and revoke access of those keys at any time.

Critically, with some careful smart contract engineering, it's even possible to limit the *permissions* and *duration* of a key.  For example, the wallet owner may create a key that's only valid for one hour, and can only interact with a specific contract.  Such a key is known as a "session key."

## Using session keys

Create a session key from a ZeroDev signer:

```typescript
import { createSessionKey } from '@zerodevapp/sdk'

const sessionKey = await createSessionKey(zdSigner, whitelist, validUntil)
```

Where:

- `zdSigner` is the ZeroDev signer
- `validUntil` is the UNIX timestamp (in seconds) at which the session key expires.  If you want a session key that doesn't expire, simply pass in a very large number (such as `99999999999` which will expire in 3000 years).
- `whitelist` is a list of policies specifying what transactions the session key can send.

The signer and the expiration time are fairly easy to understand.  Let's dive into the whitelist.

### Session Key Whitelist

A session key is limited to only sending transactions identified by the whitelist.  The whitelist specifies a list of contracts or transactions as such:

```typescript
const sessionKey = await createSessionKey(zdSigner, [{
  to: contract1.address,
  selectors: [
    contract1.interface.getSighash('function1'),
    contract1.interface.getSighash('function2'),
  ],
}, {
  to: contract2.address,
  selectors: []
}], validUntil)
```

In the example above, `contract1` and `contract2` are [Ethers Contract](https://docs.ethers.org/v5/api/contract/contract/) objects.  This particular whitelist is saying that:

- The session key can call functions `function1` and `function2` on `contract1`.
- The session key can call any function on `contract2`.

### Sending session key to the client

Typically, you construct a session key to be used by a client.  Here's how you "reconstruct" a ZeroDev wallet using the session key:

```typescript
import { createSessionKeySigner } from "@zerodevapp/sdk"

const sessionKeySigner = await createSessionKeySigner({
  projectId,
  sessionKeyData: sessionKey,
})
```

Note that you need to use the same `projectId` that you used to construct the session key.

Now you can use the `sessionKeySigner` just like a regular Ethers signer, except that it can only send transactions specified in the whitelist.

```typescript
// This is the address of the wallet
const address = await sessionSigner.getAddress()

// Use `sessionKeySigner` just like a regular Ethers signer
const nftContract = new Contract(contractAddress, contractABI, sessionSigner)
await nftContract.mint()
```

Note that whoever owns the session key will be able to send transactions with the session key, so it's important to keep the session key secure.  Of course, the point of session keys is that, since what they can do is limited by the whitelist and they expire after a while, even if some malicious party gains control of the session key, the damage is hopefully limited.

### Constructing private session key on the client side

In the example above, the "private" part of the session key was generated on the server side, then sent to the client.  This may be a security issue depending on your setup.  For example, if the server cannot be trusted to NOT leak the session key, you may want to generate the session key on the client side instead.

In this scenario, construct the session key as follows.  For the prupose of illustration, let's say that the client constructs a keypair using Ethers:

```typescript
import { Wallet } from 'ethers'

const privateSigner = Wallet.createRandom()
const sessionPublicKey = await privateSigner.getAddress()
```

Then, the client would send `sessionPublicKey` to the server, and the server would construct the full session key as such:

```typescript
import { createSessionKey } from '@zerodevapp/sdk'

const sessionKey = await createSessionKey(zdSigner, whitelist, validUntil, sessionPublicKey)
```

The server would then return `sessionKey` to the client.

When the client needs to use the session key, it would then instantiate the session key signer using both the session key and its own private key (in the form of a signer):

```typescript
const sessionKeySigner = await createSessionKeySigner({
  projectId,
  sessionKeyData: sessionKey,
  privateSigner: privateSigner,
})
```
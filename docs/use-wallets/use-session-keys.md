---
sidebar_position: 7
---

# Use Session Keys

**Session keys** are one of the most powerful features of ZeroDev wallets.  It has many applications, some of them we probably haven't even thought of, so it's well worth the time to understand what you can do with them and see if they can benefit your application.

If you already know what session keys are for, skip ahead to [using session keys](#using-session-keys).

## What are session keys?

With a traditional EOA wallet, there's only one key -- the *private key* that is able to sign any transactions for the wallet.  In other words, if you own the key, you own the wallet.  That's why it's so critical that you do not ever lose or reveal your seed phrase, which is just the private key in a more memorable form.

With an account abstraction wallet such as ZeroDev, however, the wallet is decoupled from the key: the wallet owner can assign arbitrary keys the power to issue transactions on its behalf, and revoke access of those keys at any time.

Critically, it's even possible to scope a key so that it can only send a limited set of transactions, under specific conditions, within a specific time window.  We call these scoped keys "session keys."

For a full treatise on session keys, see [Session Keys are the JWTs of Web3](https://docs.zerodev.app/blog/session-keys-are-the-jwts-of-web3).

## What can you use session keys for?

There are a few core use cases of session keys:

- **Skipping confirmations**: if you are building a highly interactive application, you might wish that your users do not have to manually confirm every single transaction.  Instead, you can create a session key for your user's current "session."  You would scope the key so it can only send the transactions that are required by your application, AND the key expires after the current session.  Now, your user can interact with your app with the session key, without using their master key which would require confirming every transaction.

- **Delegating transactions**: normally, transactions need to be actively initiated by the wallet owner.  However, sometimes the best UX is enabled when transactions can be "automated."  For example, if you are building a lending protocol, you might want to build a feature where your user can automatically close their position if it's in danger of liquidation.  Here, you could create a session key that allows for closing a position ONLY IF the position is indeed close to liquidation.  And the session key can be shared with a "watcher" (possibly your own server) that would send the transaction for the user when the condition occurs.

## Using session keys

:::info
If you ever feel lost, you can always refer to the [complete session key examples](https://github.com/zerodevapp/plugin-examples/tree/main/session-keys).
:::

Roughly speaking, using a session key consists of a three steps:

- **Generating a key**: we need to create a key in order to assign permissions to it.

- **Signing the key and its scope with your master key**: in order for the session key to gain its power, the master key needs to sign it.  Here the master key also signs the permissions so that your SCW can ascertain what the session key is allowed to do.

- **Using the session key**: now that the session key has been signed, it can be used to send transactions (but only under the approved conditions).

Let's go through these steps.

### Generating a key

We start by generating a session key (using [Viem](https://viem.sh/) in the following examples):

```javascript
const { LocalAccountSigner } = require("@alchemy/aa-core")
const { generatePrivateKey } = require('viem/accounts')

const sessionKey = LocalAccountSigner.privateKeyToAccountSigner(generatePrivateKey())
```

### Signing the key and its scope

Let's look at the code first:

```javascript
const { SessionKeyProvider, Operation, ParamCondition } = require('@zerodev/sdk')
const { getFunctionSelector, pad, zeroAddress } = require('viem')

const sessionKeyProvider = await SessionKeyProvider.init({
  // ZeroDev project ID
  projectId,
  // The master signer
  defaultProvider: ecdsaProvider,
  // the session key (private key)
  sessionKey,
  // session key parameters
  sessionKeyData: {
    // The UNIX timestamp at which the session key becomes valid
    validAfter: 0,
    // The UNIX timestamp at which the session key becomes invalid
    validUntil: 0,
    // The permissions
    // Each permission can be considered a "rule" for interacting with a particular
    // contract/function.  To create a key that can interact with multiple
    // contracts/functions, set up one permission for each.
    permissions: [
      {
        // Target contract to interact with
        target: contractAddress,
        // Maximum value that can be transferred.  In this case we
        // set it to zero so that no value transfer is possible.
        valueLimit: 0,
        // The function (as specified with a selector) that can be called on
        sig: getFunctionSelector(
          "mint(address)"
        ),
        // Whether you'd like to call this function via CALL or DELEGATECALL.
        // DELEGATECALL is dangerous -- don't use it unless you know what you
        // are doing.
        operation: Operation.Call,
        // Each "rule" is a condition on a parameter.  In this case, we only
        // allow for minting NFTs to our own account.
        rules: [
          {
            // The condition in this case is "EQUAL"
            condition: ParamCondition.EQUAL,
            // The offset of the parameter is 0 since it's the first parameter.
            // We will simplify this later.
            offset: 0,
            // We pad the address to be the correct size.
            // We will simplify this later.
            param: pad(address, { size: 32 }),
          },
        ],
      },
    ],
    // The "paymaster" param specifies whether the session key needs to
    // be used with a specific paymaster.
    // Without it, the holder of the session key can drain ETH from the
    // account by spamming transactions and wasting gas, so it's recommended
    // that you specify a trusted paymaster.
    // 
    // address(0) means it's going to work with or without paymaster
    // address(1) works only with paymaster
    // address(paymaster) works only with the specified paymaster
    paymaster: zeroAddress,
  }
})
```

As you can see, there are a LOT of flags you can set to customize the scope of the session key.  Let's go over them now:

- `validAfter`/`validUntil`: these flags specify the duration of the session key, in UNIX timestamps.
  - `validAfter` is the timestamp at which the session key becomes active.  When set to 0, it's immediately active.
  - `validUntil` is the timestamp at which the session key expires.  When set to 0, it never expires.
- `paymaster`: this specifies whether the session key should be scoped with a specific paymaster (or any paymaster).
  - When this field is empty (or a "zero address"), the session key can be used with or without a paymaster (that is, anything goes).  Note that this potentially unsafe because whoever owns the session key can then spam transactions and waste all your ETH through gas, so you would only do this if you trust the user of the session key to some extent.
  - When this field is `address(1)` (we export the value for convenience under `constants.oneAddress`), the session key MUST be used with a paymaster, but it could be any paymaster.
  - When this field is a paymaster address, the session key MUST be used with the specified paymaster.
- `permissions`: this is an array where each element specifies a function (of a specific contract) that the key is allowed to call.  Now we look at the flags within each element:
  - `target`: the target contract to call
  - `sig`: the [selector](https://solidity-by-example.org/function-selector/) of the function to call
  - `valueLimit`: the maximum [value](https://coinmarketcap.com/alexandria/glossary/ethereum-transaction#:~:text=The%20value%20is%20the%20amount%20of%20Ether%20to%20transfer%20from%20the%20sender%20to%20the%20recipient%2C%20and%20this%20can%20even%20be%20zero.) that can be transmitted.
  - `operation`: whether the function is to be called via [`CALL` or `DELEGATECALL`](https://ethereum.stackexchange.com/questions/3667/difference-between-call-callcode-and-delegatecall).  Unless you know what you are doing, stick with `CALL` (which is the default).
  - `rules`: an array where each element specifies a condition for a function parameter.  Now we look at the flags within each element:
    - `condition`: This can be `EQUAL`, `GREATER_THAN`, `LESS_THAN`, `GREATER_THAN_OR_EQUAL`, `LESS_THAN_OR_EQUAL`, `NOT_EQUAL`
    - `offset`: the offset of the parameter in question.  For example, the first parameter would have an offset of 0.  We are working on making it easier to specify this flag.
    - `param`: the parameter itself.  Currently it requires some padding, but we are working on making it easier to specify this flag.

### Using the session key

Now you can use the `sessionKeyProvider` like you would use any `ecdsaProvider`.  For example, to send a UserOp:

```javascript
const { hash } = await sessionKeyProvider.sendUserOperation({
  target: contractAddress,
  data: encodeFunctionData({
    abi: contractABI,
    functionName: "mint",
    args: [address],
  }),
})

await sessionKeyProvider.waitForUserOperationTransaction(hash)
```

## Sharing Session Keys over the Network

:::info
You can refer to the [complete code examples here](https://github.com/zerodevapp/plugin-examples/tree/main/session-keys).
:::

Since session keys are created by the wallet owner and shared with the session key user, it's natural to wonder how they can be transmitted over the network, in case the owner and the session key user run on separate nodes.

For brevity, we will be referring to the session key user as the "agent," as in an agent that acts on behalf of the wallet owner through the session key.

Generally speaking, there are two ways to do it:

- The owner creates the session key and sends it to the agent.
- The agent creates a public-private key pair, sends the public key to the owner to "register" it as a session key, and finally uses the session key through the private key.

The first approach requires less communication between the owner and the agent, whereas the second approach is more secure since the private part of the session key never leaves the agent (not even the owner sees it), so there's less of a chance for the session key to be leaked.

Now we take a look at how to implement the two approaches:

### Owner creating the session key

Start by serializing the session key:

```javascript
// sessionPrivateKey is the private key of the session key
const serializedSessionKeyParams = await sessionKeyProvider.serializeSessionKeyParams(sessionPrivateKey)
```

Then send the serialized key to the agent.  The agent deserializes it and constructs the `SessionKeyProvider`: 

```javascript
const sessionKeyParams = SessionKeyProvider.deserializeSessionKeyParams(serializedSessionKeyParams)

const sessionKeyProvider = await SessionKeyProvider.fromSessionKeyParams({
  projectId,
  sessionKeyParams
})
```

### Agent registering the session key with the owner

The agent first creates a public-private key pair.  With Viem, it looks like this:

```javascript
const { LocalAccountSigner } = require("@alchemy/aa-core")

const sessionPrivateKey = generatePrivateKey()
const sessionKey = LocalAccountSigner.privateKeyToAccountSigner(sessionPrivateKey)
const sessionPublicKey = await sessionKey.getAddress()
```

Now, the agent sends the public key (address) of the session key to the owner.  The owner then "registers" the key:

```javascript
const { EmptyAccountSigner } = require('@zerodev/sdk')

// Create an "empty signer" with the public key alone
const sessionKey = new EmptyAccountSigner(sessionPublicKey)

// create the provider 
const sessionKeyProvider = await SessionKeyProvider.init({
  sessionKey,
  // the other params, such as the permissions...
})

const serializedSessionKeyParams = sessionKeyProvider.serializeSessionKeyParams()
```

The owner then sends the serialized session key to the agent.  The agent can now reconstruct a functional `SessionKeyProvider`:

```javascript
const sessionKeyParams = {
  ...SessionKeyProvider.deserializeSessionKeyParams(serializedSessionKey),
  sessionPrivateKey,
}

const sessionKeyProvider = await SessionKeyProvider.fromSessionKeyParams({
  projectId,
  sessionKeyParams,
})

const { hash } = await sessionKeyProvider.sendUserOperation({
  // ...use the session key provider as you normally would
})
```
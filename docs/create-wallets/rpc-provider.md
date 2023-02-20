---
sidebar_position: 3
---

# Create Wallets with RPC Provider

Sometimes you have a RPC provider such as [Web3Auth](https://web3auth.io/), [Magic](https://magic.link/), or MetaMask that can sign transactions over a connection, and you want to use them as the *owner* of your AA wallet.

## An Example with Magic

Say you want to use [Magic](https://magic.link/) to handle social logins, but you want to use ZeroDev to create AA wallets for your users.

Magic exposes an `rpcProvider`.  To create a ZeroDev wallet using Magic, simply pass the rpc provider to the SDK:

```typescript
import { AASigner, RPCProviderOwner } from '@zerodevapp/sdk'
import { Magic } from 'magic-sdk';

const magic = new Magic('MAGIC_API_KEY', {
  // some magic options...
})

const signer = new AASigner({
  projectId: "<project id>",
  owner: new RPCProviderOwner(magic.rpcProvider),
})
```

## API

### Ethers

```typescript
import { AASigner, RPCProviderOwner } from '@zerodevapp/sdk'

const signer = new AASigner({
  projectId: "<project id>",
  owner: new RPCProviderOwner(rpcProvider),
})
```

Sometimes you only have a [`Signer`](https://docs.ethers.org/v5/api/signer/) and not a full RPC provider, in which case you'd use:

```typescript
import { AASigner, SignerOwner } from '@zerodevapp/sdk'

const signer = new AASigner({
  projectId: "<project id>",
  owner: new SignerOwner(signer),
})
```

### Wagmi
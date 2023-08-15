---
sidebar_position: 2
---

# Web3Auth

Web3Auth is a popular embedded wallet provider that supports social logins.  While social logins are great, your users still need to onramp in order to pay for gas, which introduces significant friction.

By combining ZeroDev with Web3Auth, you can use Web3Auth to enable a smooth social login experience, while using ZeroDev as the smart wallet to sponsor gas for users, batch transactions, and more.

## Integration

Web3Auth exposes an `provider` object.  To create a ZeroDev wallet using Web3Auth, simply pass the provider to the SDK:

```typescript
import { ECDSAProvider, getRPCProviderOwner } from '@zerodev/sdk'
import { Web3Auth } from "@web3auth/modal"

const web3auth = new Web3Auth({
  // web3auth config...
})

await web3auth.initModal()

web3auth.connect()

const signer = await ECDSAProvider.init({
  projectId: "<project id>",
  owner: getRPCProviderOwner(web3auth.provider),
})
```
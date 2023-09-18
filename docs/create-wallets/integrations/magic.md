---
sidebar_position: 2
---

# Magic

Magic is a popular embedded wallet provider that supports social logins.  While social logins are great, your users still need to onramp in order to pay for gas, which introduces significant friction.

By combining ZeroDev with Magic, you can use Magic to enable a smooth social login experience, while using ZeroDev as the smart wallet to sponsor gas for users, batch transactions, and more.

## Integration

Magic exposes an `rpcProvider` object.  To create a ZeroDev wallet using Magic, simply pass the provider to the SDK:

```typescript
import { ECDSAProvider, getRPCProviderOwner } from "@zerodev/sdk";
import { Magic } from "magic-sdk";

const magic = new Magic("MAGIC_API_KEY", {
  // magic config...
});

let ecdsaProvider = await ECDSAProvider.init({
  projectId, // zeroDev projectId
  owner: getRPCProviderOwner(magic.rpcProvider),
});
```
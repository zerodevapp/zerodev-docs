---
sidebar_position: 2
---

# Turnkey

[Turnkey](https://www.turnkey.io/) is a key infrastructure provider with a great developer API and a powerful security policy engine.

By combining ZeroDev with Turnkey, you can create **custodial AA wallets** whose security is provided by Turnkey, with powerful functionalities such as sponsoring gas, batching transactions, etc.

## Integration

Since Turnkey provides an [Ethers SDK](https://turnkey.readme.io/docs/sign-with-ethers), the integration is very straightforward.

```typescript
import { getZeroDevSigner, getPrivateKeyOwner } from '@zerodevapp/sdk'
import { TurnkeySigner } from "@turnkey/ethers"

const turnkeySigner = new TurnkeySigner({
  apiPublicKey: process.env.API_PUBLIC_KEY!,
  apiPrivateKey: process.env.API_PRIVATE_KEY!,
  baseUrl: process.env.BASE_URL!,
  organizationId: process.env.ORGANIZATION_ID!,
  privateKeyId: process.env.PRIVATE_KEY_ID!,
})

const zerodevSigner = await getZeroDevSigner({
  projectId: "<project id>",
  owner: turnkeySigner,
})
```
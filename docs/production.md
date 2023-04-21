---
sidebar_position: 8
---

# Deploying to Production

## Pinning a smart contract wallet version

ZeroDev may update its smart contract wallet implementation from time to time.  We advise product apps to "pin" their smart contract wallet version, so that your new users don't wound up with a different version of the wallet than your old users within the same app.

To pin a smart contract wallet version, specify the `implementation` parameter when you construct a ZeroDev wallet, like this:

```typescript
import { kernelAccount_v1_audited } from '@zerodevapp/sdk/src/accounts'

const signer = await getZeroDevSigner({
  // ...other options
  implementation: kernelAccount_v1_audited,
})
```

If you are not sure which version to use, [join our Discord](https://discord.gg/KS9MRaTSjx) and ask.

## Whitelist Domains

If you are deploying our social login integrations into production and running into `Error: could not validate redirect, please whitelist your domain: `, make sure to whitelist your domain on [our dashboard](https://dashboard.zerodev.app/).
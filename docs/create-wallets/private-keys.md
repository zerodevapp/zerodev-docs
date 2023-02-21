---
sidebar_position: 2
---

# Create Wallets with Private Keys

If your application already manages private keys for users, you can use ZeroDev to create AA wallets that are *owned* by those private keys.

## API 

### Ethers.js

```typescript
import { getZeroDevSigner, getPrivateKeyOwner } from '@zerodevapp/sdk'

const signer = getZeroDevSigner({
  projectId: "<project id>",
  owner: getPrivateKeyOwner("<private key>"),
})
```

### Wagmi

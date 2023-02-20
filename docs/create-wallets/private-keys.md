---
sidebar_position: 2
---

# Create Wallets with Private Keys

If your application already manages private keys for users, you can use ZeroDev to create AA wallets that are *owned* by those private keys.

## API 

### Ethers.js

```typescript
import { AASigner, PrivateKeyOwner } from '@zerodevapp/sdk'

const signer = new AASigner({
  projectId: "<project id>",
  owner: new PrivateKeyOwner("<private key>"),
})
```

### Wagmi

---
sidebar_position: 4
---

# Create Wallets with Private Keys

If your application already manages private keys for users, you can use ZeroDev to create AA wallets that are *owned* by those private keys.

## API 

### Ethers.js

```
import { AASigner, PrivateKeyOwner } from 'zerodev'

const signer = new AASigner({
  projectId: "<project id>",
  owner: new PrivateKeyOwner("<private key>"),
})
```

### Wagmi

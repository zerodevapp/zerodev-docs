---
sidebar_position: 2
---

# EOA Transfer

```typescript
import { getZeroDevSigner } from '@zerodevapp/sdk'

const signer = getZeroDevSigner({
    projectId: '<your-project-id>',
    owner: <Owner>
})

const assets = await signer.fetchAssetList()
await signer.transferAsset('<target-address>', assets)
```

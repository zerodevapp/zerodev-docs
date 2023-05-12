---
sidebar_position: 3
---

# Fireblocks

[Fireblocks](http://fireblocks.com/) is a widely used key infrastructure provider.  By combining ZeroDev with Fireblocks, you can create **custodial AA wallets** whose security is provided by Fireblocks, with powerful functionalities such as sponsoring gas, batching transactions, etc.

## Integration

Follow [Fireblock’s Ethereum guide](https://developers.fireblocks.com/docs/ethereum-development#ethersjs-integration) to set up a `FireblocksWeb3Provider`:

```typescript
import { FireblocksWeb3Provider, ChainId } from "@fireblocks/fireblocks-web3-provider";

const fireblocksProvider = new FireblocksWeb3Provider({
    apiBaseUrl: ApiBaseUrl.Sandbox // If using a sandbox workspace
    privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH,
    apiKey: process.env.FIREBLOCKS_API_KEY,
    vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
    chainId: ChainId.GOERLI,
})
```

Make sure the `chainId` actually matches the chain of your ZeroDev project.

Then, create a `ZeroDevSigner` as such:

```typescript
import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk'

const zdSigner = await getZeroDevSigner({
  projectId: "<project id>",
  owner: getRPCProviderOwner(fireblocksProvider),
})
```

This will create an AA wallet “owned” by your Fireblocks key.
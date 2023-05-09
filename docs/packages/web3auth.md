---
sidebar_position: 2
---

# @zerodevapp/web3auth

## Customization

You can use ZeroDev with your own Web3Auth crendentials.

```typescript
import { ZeroDevWeb3AuthOptions } from '@zerodevapp/web3auth'

const zeroDevWeb3AuthOptions: ZeroDevWeb3AuthOptions  = {
    adapterSettings: {
        network: 'testnet'
    },
    web3authOptions: {
        clientId: '<your-web3auth-client-id>'
    }
}
const connector = new GoogleSocialWalletConnector({options: {
  projectId: defaultProjectId,
  ...zeroDevWeb3AuthOptions
}})
```


## Get User Info

Once a user is logged in, you can retrieve their information via:

```typescript
import { ZeroDevWeb3Auth } from '@zerodevapp/web3auth';
const zeroDevWeb3Auth = new ZeroDevWeb3Auth('<project-id>')
zeroDevWeb3Auth.getUserInfo()
```

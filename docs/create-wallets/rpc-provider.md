---
sidebar_position: 3
---

# Create Wallets with RPC Provider

Sometimes you have a RPC provider such as [Web3Auth](https://web3auth.io/), [Magic](https://magic.link/), or MetaMask that can sign transactions over a connection, and you want to use them as the *owner* of your AA wallet.

## An Example with Magic

Say you want to use [Magic](https://magic.link/) to handle social logins, but you want to use ZeroDev to create AA wallets for your users.

Magic exposes an `rpcProvider`.  To create a ZeroDev wallet using Magic, simply pass the rpc provider to the SDK:

```typescript
import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk'
import { Magic } from 'magic-sdk';

const magic = new Magic('MAGIC_API_KEY', {
  // some magic options...
})

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: getRPCProviderOwner(magic.rpcProvider),
})
```

## API

### Ethers

```typescript
import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk'

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: getRPCProviderOwner(rpcProvider),
})
```

Example using MetaMask as an owner (only works if you have MetaMask installed):

```jsx live folded
function PrivateKeyExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const createWallet = async () => {
    setLoading(true)
    const signer = await getZeroDevSigner({
      projectId: defaultProjectId,
      owner: getRPCProviderOwner(window.ethereum),
    })
    setAddress(await signer.getAddress())
    setLoading(false)
  }

  return (
    <div>
      <div>
      <button onClick={createWallet} disabled={loading}>{ loading ? 'loading...' : 'Create Wallet'}</button>
      </div>
      {address && 
        <div>
          <label>Wallet: {address}</label>
        </div>
      }
    </div>
  )
}
```


### Wagmi

To connect to your wallet via `RPC Provider` you can use the universal ZeroDevConnector and pass the `owner` using the `getRPCProviderOwner` initiator.
```
import { ZeroDevConnector, type AccountParams } from '@zerodevapp/wagmi'
import { getRPCProviderOwner } from '@zerodevapp/sdk'

const connector = new ZeroDevConnector({chains, {
  projectId: <your-project-id>,
  owner: getRPCProviderOwner(window.ethereum),
}})
```

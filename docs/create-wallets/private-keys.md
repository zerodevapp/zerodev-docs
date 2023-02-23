---
sidebar_position: 2
---

# Create Wallets with Private Keys

If your application already manages private keys for users, you can use ZeroDev to create AA wallets that are *owned* by those private keys.

## API 

### Ethers.js

```typescript
import { getZeroDevSigner, getPrivateKeyOwner } from '@zerodevapp/sdk'

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: getPrivateKeyOwner("<private key>"),
})
```

Example:

```jsx live folded
function PrivateKeyExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [privateKey, setPrivateKey] = useState('468f0c80d5336c4a45be71fa19b77e9320dc0abaea4fd018e0c49aca90c1db78')

  const createWallet = async () => {
    setLoading(true)
    const signer = await getZeroDevSigner({
      projectId: defaultProjectId,
      owner: getPrivateKeyOwner(privateKey),
    })
    setAddress(await signer.getAddress())
    setLoading(false)
  }

  return (
    <div>
      <div>
      <input value={privateKey} size="80" onChange={(e) => setPrivateKey(e.target.value)}/>
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

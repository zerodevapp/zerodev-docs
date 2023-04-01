---
sidebar_position: 3
---

# Create Wallets with Signers

At its core, ZeroDev is able to use anything that's capable of 1) signing, and 2) returning a public key as the owner of an AA wallet.  Therefore, you can create an AA wallet from any [Ethers `Signer` object](https://docs.ethers.org/v5/api/signer) that implements the `getAddress` and `signMessage` functions.

## API

### Ethers

```typescript
import { getZeroDevSigner } from '@zerodevapp/sdk'

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: <your signer>,
})
```

Example using a private key signer:

```jsx live folded
function PrivateKeyExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [privateKey, setPrivateKey] = useState('468f0c80d5336c4a45be71fa19b77e9320dc0abaea4fd018e0c49aca90c1db78')

  const createWallet = async () => {
    setLoading(true)
    const signer = await getZeroDevSigner({
      projectId: defaultProjectId,
      owner: new Wallet(privateKey),
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

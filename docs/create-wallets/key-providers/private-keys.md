---
sidebar_position: 1
---

# Private Keys

If you already manage private keys for your users, and you simply want to use ZeroDev for AA, you can easily integrate ZeroDev with your existing key infrastructure.

## Private Keys

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

```typescript
import { ZeroDevConnector } from '@zerodevapp/wagmi'
import { getPrivateKeyOwner } from '@zerodevapp/sdk'
const connector = new ZeroDevConnector({chains, options: {
  projectId: "<your-project-id>",
  owner: getPrivateKeyOwner("<private-key>"),
}})
```

Example:

```jsx live folded
function WagmiPrivateKeyExample() {

  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [infuraProvider({apiKey: infuraApiKey})],
  )
  const client = createClient({
    autoConnect: false,
    connectors: [
      new ZeroDevConnector({chains, options: {
        projectId: defaultProjectId,
        owner: getPrivateKeyOwner('468f0c80d5336c4a45be71fa19b77e9320dc0abaea4fd018e0c49aca90c1db78'),
      }})
    ],
    provider,
    webSocketProvider,
  })

  const ConnectButton = () => {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { address, connector, isConnected } = useAccount()
    const { chain } = useNetwork()

    if (isConnected) {
      return (
        <div>
          <div>{address}</div>
          <div>Connected to {connector.name}</div>
          <a href={`${chain.blockExplorers.default.url}/address/${address}`} target="_blank">Explorer</a>
        </div>
      )
    }
    return (
      <button disabled={isLoading} onClick={() => connect({connector: connectors[0]})}>
        {isLoading ? 'loading...' : 'Connect'}
      </button>
    )
  }
  return (
    <WagmiConfig client={client}>
      <ConnectButton />
    </WagmiConfig>
  )
}
```
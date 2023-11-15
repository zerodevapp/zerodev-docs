---
sidebar_position: 1
sidebar_label: Private Key Wallets
---

# Creating Private Key Wallets

You can easily create AA wallets for your users from private keys.

## Private Keys

### Viem

```typescript
import { ECDSAProvider } from "@zerodev/sdk";
import { PrivateKeySigner } from "@alchemy/aa-core";

// The ZeroDev provider
const ecdsaProvider = await ECDSAProvider.init({
  // ZeroDev projectId
  projectId,
  // The signer
  owner: PrivateKeySigner.privateKeyToAccountSigner(PRIVATE_KEY),
});
```

Example:

```jsx live folded
function PrivateKeyExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [privateKey, setPrivateKey] = useState('0x468f0c80d5336c4a45be71fa19b77e9320dc0abaea4fd018e0c49aca90c1db78')

  const createWallet = async () => {
    setLoading(true)
    const ecdsaProvider = await ECDSAProvider.init({
      projectId: defaultProjectId,
      owner: PrivateKeySigner.privateKeyToAccountSigner(privateKey),
    })
    setAddress(await ecdsaProvider.getAddress())
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
import { ZeroDevConnector } from '@zerodev/wagmi'
import { PrivateKeySigner } from "@alchemy/aa-core";
const connector = new ZeroDevConnector({chains, options: {
  projectId: "<your-project-id>",
  owner: PrivateKeySigner.privateKeyToAccountSigner("<private-key>"),
}})
```

Example:

```jsx live folded
function WagmiPrivateKeyExample() {

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [infuraProvider({apiKey: infuraApiKey})],
  )
  const config = createConfig({
    autoConnect: false,
    connectors: [
      new ZeroDevConnector({chains, options: {
        projectId: defaultProjectId,
        owner: PrivateKeySigner.privateKeyToAccountSigner('0x468f0c80d5336c4a45be71fa19b77e9320dc0abaea4fd018e0c49aca90c1db78'),
      }})
    ],
    publicClient,
    webSocketPublicClient,
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
    <WagmiConfig config={config}>
      <ConnectButton />
    </WagmiConfig>
  )
}
```
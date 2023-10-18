---
sidebar_position: 10
---

# Custom Integration

If you are using a third-party service to manage private keys, you can integrate it with ZeroDev as long as it provides a [signer](https://docs.ethers.org/v5/api/signer/) or an [RPC provider](https://docs.ethers.org/v5/api/providers/provider/) interface (or you could implement the interface yourself).

ZeroDev can be easily integrated with any third-party signing service as long as it exposes the proper interface.  Specifically, ZeroDev works with any Ethers [signer](https://docs.ethers.org/v5/api/signer/) or [RPC provider](https://docs.ethers.org/v5/api/providers/provider/).

## Signer

### Ethers

```typescript
import { ECDSAProvider } from '@zerodev/sdk'

const ecdsaProvider = await ECDSAProvider.init({
  projectId: "<project id>",
  owner: <your signer>,
})
```

Example using a private key signer:

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

## RPC Provider

### Ethers

```typescript
import { ECDSAProvider, getRPCProviderOwner } from '@zerodev/sdk'

const signer = await ECDSAProvider.init({
  projectId: "<project id>",
  owner: getRPCProviderOwner(rpcProvider),
})
```

Example using MetaMask as an owner (only works if you have MetaMask installed):

```jsx live folded
function RpcProviderExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const createWallet = async () => {
    setLoading(true)
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })
      const ecdsaProvider = await ECDSAProvider.init({
        projectId: defaultProjectId,
        owner: getRPCProviderOwner(window.ethereum),
      })
      setAddress(await ecdsaProvider.getAddress())
    } catch(error) {
      console.log(error)
    }
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

```typescript
import { ZeroDevConnector } from '@zerodev/wagmi'

const connector = new ZeroDevConnector({chains, options: {
  projectId: <your-project-id>,
  owner: getRPCProviderOwner(<provider>),
}})
```

Example:

```jsx live folded
function WagmiRPCProviderExample() {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [infuraProvider({apiKey: infuraApiKey})],
  )
  const config = createConfig({
    autoConnect: false,
    connectors: [
      new ZeroDevConnector({options: {
        projectId: defaultProjectId,
        owner: getRPCProviderOwner(window.ethereum),
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
          {chain.blockExplorers && <a href={`${chain.blockExplorers.default.url}/address/${address}`} target="_blank">Explorer</a>}
        </div>
      )
    }
    return (
      <button disabled={isLoading} onClick={() => {
        ethereum.request({
          method: "eth_requestAccounts"
        }).then(() => {
          connect({connector: connectors[0]})
        })
      }}>
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

You can also "wrap" an existing Wagmi connect with `enhanceConnectorWithAA`, which will create an AA wallet and use the connector as a signer/owner for the AA wallet.

```typescript
import { enhanceConnectorWithAA } from '@zerodev/wagmi'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'

const config = createConfig({
  connectors: [
    enhanceConnectorWithAA(
      new MetaMaskConnector({ chains }), 
      { projectId: "<your-project-id>" }
    ),
  ],
})
```

```jsx live folded
function WagmiWrappedRPCProviderExample() {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [infuraProvider({apiKey: infuraApiKey})],
  )
  const config = createConfig({
    autoConnect: false,
    connectors: [
      enhanceConnectorWithAA(
        new MetaMaskConnector({ chains }), 
        { projectId: defaultProjectId }
      ),
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
          {chain.blockExplorers && <a href={`${chain.blockExplorers.default.url}/address/${address}`} target="_blank">Explorer</a>}
        </div>
      )
    }
    return (
      <button disabled={isLoading} onClick={() => {
        ethereum.request({
          method: "eth_requestAccounts"
        }).then(() => {
          connect({connector: connectors[0]})
        })
      }}>
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
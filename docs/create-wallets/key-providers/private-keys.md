---
sidebar_position: 2
---

# Custom Key Provider

If you already manage private keys for your users (whether through your application or a third-party service), and you simply want to use ZeroDev for AA, you can easily integrate ZeroDev with your existing key infrastructure.

At its core, ZeroDev can spin up an AA wallet from any *signer* that serves as the *owner* of the AA wallet.  A signer is something that, at the minimum, can do two things:

- Return the address of the signer
- Sign messages (such that the signature can be verified against the signer address)

Broadly speaking, there are three ways you can integrate your own keys with ZeroDev: you can provide a private key, a [signer](https://docs.ethers.org/v5/api/signer/), or an [RPC provider](https://docs.ethers.org/v5/api/providers/provider/).

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
    [publicProvider()],
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

## Signer

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

## RPC Provider

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
function RpcProviderExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const createWallet = async () => {
    setLoading(true)
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })
      const signer = await getZeroDevSigner({
        projectId: defaultProjectId,
        owner: getRPCProviderOwner(window.ethereum),
      })
      setAddress(await signer.getAddress())
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
import { ZeroDevConnector } from '@zerodevapp/wagmi'
import { getPrivateKeyOwner } from '@zerodevapp/sdk'
const connector = new ZeroDevConnector({chains, options: {
  projectId: <your-project-id>,
  owner: getRPCProviderOwner(<provider>),
}})
```

Example:

```jsx live folded
function WagmiRPCProviderExample() {
  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [publicProvider()],
  )
  const client = createClient({
    autoConnect: false,
    connectors: [
      new ZeroDevConnector({options: {
        projectId: defaultProjectId,
        owner: getRPCProviderOwner(window.ethereum),
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
    <WagmiConfig client={client}>
      <ConnectButton />
    </WagmiConfig>
  )
}
```

You can also "wrap" an existing Wagmi connect with `enhanceConnectorWithAA`, which will create an AA wallet and use the connector as a signer/owner for the AA wallet.

```typescript
import { enhanceConnectorWithAA } from '@zerodevapp/wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const client = createClient({
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
  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [publicProvider()],
  )
  const client = createClient({
    autoConnect: false,
    connectors: [
      enhanceConnectorWithAA(
        new MetaMaskConnector({ chains }), 
        { projectId: defaultProjectId }
      ),
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
    <WagmiConfig client={client}>
      <ConnectButton />
    </WagmiConfig>
  )
}
```
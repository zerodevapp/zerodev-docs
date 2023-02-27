---
sidebar_position: 5
---

# Create Social Wallets

## API

### Ethers

```typescript
import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk'

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: getRPCProviderOwner(rpcProvider),
})
import { 
  MultiSocialWallet, 
  GoogleSocialWallet, 
  FacebookSocialWallet,
  GithubSocialWallet,
  DiscordSocialWallet,
  TwitchSocialWallet,
  TwitterSocialWallet
} from '@zerodevapp/social-wallet';

const socialWallet = new AnySocialWalletFromAbove()

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: getRPCProviderOwner(await socialWallet.connect(<chain-id>)),
})
```

Example using MultiSocialWallet as an owner (only works if you have MetaMask installed):

```jsx live folded
function RpcProviderExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const socialWallet = useMemo(() => {
    return new MultiSocialWallet()
  }, [])
  
  const createWallet = async () => {
    setLoading(true)
    const provider = await socialWallet.connect(80001)
    if (provider) {
      const signer = await getZeroDevSigner({
        projectId: defaultProjectId,
        owner: getRPCProviderOwner(provider)
      })
      setAddress(await signer.getAddress())
    }
    setLoading(false)
  }

  const disconnect = async () => {
    await socialWallet.disconnect()
    setAddress('')
  }

  const connected = !!address

  return (
    <div>
      {connected && 
        <div>
          <label>Wallet: {address}</label>
        </div>
      }
      <div>
        {!connected && <button onClick={createWallet} disabled={loading}>{ loading ? 'loading...' : 'Create Wallet'}</button>}
        {connected && 
          <button onClick={disconnect} disabled={loading}>Disconnect</button>
        }
      </div>
    </div>
  )
}
```

### Wagmi

```typescript
import { 
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from '@zerodevapp/wagmi'
const connector = new AnySocialWalletConnectorFromAbove({options: {
  projectId: <your-project-id>,
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
    provider,
    webSocketProvider,
  })

  const ConnectButton = () => {
    const [loading, setLoading] = useState(false)
    const { connect, error, isLoading, pendingConnector } = useConnect()
    const { address, connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { chain } = useNetwork()

    const connectWallet = async () => {
      setLoading(true)
      await connect({
        connector: new GoogleSocialWalletConnector({options: {
          projectId: defaultProjectId,
        }})
      })
      setLoading(false)
    }

    if (isConnected) {
      return (
        <div>
          <div>{address}</div>
          <div>Connected to {connector.name}</div>
          <a href={`${chain.blockExplorers.default.url}/address/${address}`} target="_blank">Explorer</a><br />
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )
    }
    return (
      <button disabled={isLoading || loading} onClick={connectWallet}>
        {isLoading || loading ? 'loading...' : 'Connect'}
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
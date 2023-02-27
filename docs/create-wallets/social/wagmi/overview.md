---
sidebar_position: 1
---

# Overview

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
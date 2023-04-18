---
sidebar_position: 5
---

# Custom "Connect Wallet" UI

ZeroDev provides a number of "social connectors" for creating smart wallets with social accounts.  Under the hood, we use Web3Auth to generate a private key from a social account, then set the private key as the owner of the smart wallet.  From the perspective of the end user, they are just signing in with a social account, and getting a smart wallet at the end.

Social connectors are available in Wagmi and Ethers.

## Wagmi

Install our Wagmi package:

```bash
npm i @zerodevapp/wagmi
```

Then initialize a connector by passing in a ZeroDev project ID, as follows:

```typescript
import { 
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from '@zerodevapp/wagmi'

const connector = new GoogleSocialWalletConnector({options: {
  projectId: <your-project-id>,
}})
```

Example:

```jsx live folded
function WagmiGoogleExample() {

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
        {isLoading || loading ? 'loading...' : 'Connect to Google'}
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

## Ethers

Install the following package:

```bash
npm i @zerodevapp/social-wallet
```

Then import the social wallets and use them with `getZeroDevSigner` from the SDK:

```typescript
import { getZeroDevSigner, getSocialWalletOwner } from '@zerodevapp/sdk'

import { 
  SocialWallet, 
  GoogleSocialWallet, 
  FacebookSocialWallet,
  GithubSocialWallet,
  DiscordSocialWallet,
  TwitchSocialWallet,
  TwitterSocialWallet
} from '@zerodevapp/social-wallet';

const socialWallet = new GoogleSocialWallet()

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: await getSocialWalletOwner("<project id>", socialWallet),
})
```

You can pick and choose the social login methods you'd like to use, or use `SocialWallet` which shows a meta login modal with all login methods.  Here's an example:

```jsx live folded
function RpcProviderExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const socialWallet = useMemo(() => {
    return new SocialWallet()
  }, [])
  
  const createWallet = async () => {
    setLoading(true)
    const signer = await getZeroDevSigner({
      projectId: defaultProjectId,
      owner: await getSocialWalletOwner(defaultProjectId, socialWallet)
    })
    setAddress(await signer.getAddress())
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
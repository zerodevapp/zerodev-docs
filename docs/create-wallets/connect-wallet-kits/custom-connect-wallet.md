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
function WagmiSocialExample() {

  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [publicProvider()],
  )
  const client = createClient({
    autoConnect: false,
    provider,
    webSocketProvider,
  })
  const socialConnector = new SocialWalletConnector({chains, options: {
    projectId: defaultProjectId,
  }})

  const ConnectButton = () => {
    const [loading, setLoading] = useState(false)
    const { connect, error, isLoading, pendingConnector } = useConnect()
    const { address, connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { chain } = useNetwork()

    const connectWallet = async () => {
      setLoading(true)
      await connect({
        connector: socialConnector
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
        {isLoading || loading ? 'loading...' : 'Connect to Social'}
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
npm i @zerodevapp/web3auth
```

Then import the social wallets and use them with `getZeroDevSigner` from the SDK:

```typescript
import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk'
import { ZeroDevWeb3AuthNoModal, ZeroDevWeb3Auth } from '@zerodevapp/web3auth';

let signer: ZeroDevSigner

const zeroDevWeb3AuthNoModal = new ZeroDevWeb3AuthNoModal(['<project-id>'])
zeroDevWeb3AuthNoModal.init({onConnect: async () => {
  signer = await getZeroDevSigner({
    projectId: "<project id>",
    owner: await getRPCProviderOwner(zeroDevWeb3AuthNoModal.provider),
  })
}})
// 'google' | 'facebook' | 'twitter' | 'discord' | 'github' | 'twitch'
zeroDevWeb3AuthNoModal.connect('google')
```

You can pick and choose the social login methods you'd like to use, or use `ZeroDevWeb3Auth` which shows a meta login modal with all login methods.  Here's an example:

```jsx live folded
function RpcProviderExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const setWallet = async (provider) => {
    const signer = await getZeroDevSigner({
      projectId: defaultProjectId,
      owner: await getRPCProviderOwner(provider)
    })
    setAddress(await signer.getAddress())
  }

  const zeroDevWeb3Auth = useMemo(() => {
    const instance = new ZeroDevWeb3AuthWithModal([defaultProjectId])
    instance.init({onConnect: async () => {
      setLoading(true)
      setWallet(zeroDevWeb3Auth.provider)
      setLoading(false)
    }})
    return instance
  }, [])

  const disconnect = async () => {
    await zeroDevWeb3Auth.logout()
    setAddress('')
  }

  const handleClick = async () => {
    setLoading(true)
    zeroDevWeb3Auth.connect('social').then(provider => {
      setWallet(provider)
    }).finally(() => {
      setLoading(false)
    })
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
        {!connected && <button onClick={handleClick} disabled={loading}>{ loading ? 'loading...' : 'Create Wallet'}</button>}
        {connected && 
          <button onClick={disconnect} disabled={loading}>Disconnect</button>
        }
      </div>
    </div>
  )
}
```
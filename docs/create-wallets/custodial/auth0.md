---
sidebar_position: 3
sidebar_label: Auth0
---

# Creating Custodial Wallets with Auth0

If your app uses Auth0 for authentication, you can use ZeroDev to seamlessly create a smart wallet for each user.  Follow these steps:

1. Visit the [Dashboard](https://dashboard.zerodev.app/).
2. Click on the top-right menu.
3. Choose `Authentication Providers`.
4. Enter your Auth0 credentials in the `Auth0 Wallet` section.

Currently, integrating with Auth0 involves some manual setup on our side.  Upon saving your Auth0 credentials, we will set up the integration within 24 business hours and email you to confirm.  If in doubt, you can get in touch with us [on Discord](https://discord.gg/KS9MRaTSjx) or email support@zerodev.app.

## Wagmi

```typescript
import { Auth0WalletConnector } from '@zerodev/wagmi'

const auth0Connector = new Auth0WalletConnector({options: {
    projectId: '<your-project-id>',
}})
```

Example:

```jsx live folded
function WagmiAuth0Example() {
    const { chains, provider, webSocketProvider } = configureChains(
        [polygonMumbai],
        [infuraProvider({apiKey: infuraApiKey})],
    )
    const client = createClient({
        autoConnect: false,
        provider,
        webSocketProvider,
    })

    const auth0Connector = new Auth0WalletConnector({chains, options: {
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
                connector: auth0Connector
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
                {isLoading || loading ? 'loading...' : 'Connect to Auth0'}
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

```typescript
import { ZeroDevWeb3Auth } from '@zerodev/web3auth'

let signer: ZeroDevSigner
const instance = new ZeroDevWeb3Auth(defaultProjectId)
instance.init({onConnect: async () => {
    signer = await getZeroDevSigner({
        projectId: defaultProjectId,
        owner: await getRPCProviderOwner(provider)
    })
}})

zeroDevWeb3Auth.connect('auth0')
```

Example:

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
        const instance = new ZeroDevWeb3Auth([defaultProjectId])
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
    zeroDevWeb3Auth.connect('auth0').then(provider => {
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

---
sidebar_position: 5
sidebar_label: JWT Wallets
---

# Creating Custodial Wallets with JWT

If your app uses JWTs for authentication, you can use ZeroDev to seamlessly create a smart wallet for each user.  Follow these steps:

1. Visit the [Dashboard](https://dashboard.zerodev.app/).
2. Click on the `Auth0 / JWT` tab in the lower left corner.
3. Enter your JWKS credentials in the `JWT Wallet` section and click `Save`.

JWKS stands for JSON Web Key Set. It is a standard for representing a set of cryptographic keys, specifically public keys, in a JSON format. These public keys are used to verify the signatures of JWTs in various security and identity protocols, such as OAuth 2.0 and OpenID Connect.  If you are unsure how to retrieve your JWKS endpoint, [join our Discord](https://discord.gg/KS9MRaTSjx) and ask.

Currently, integrating with JWTs involves some manual setup on our side.  Upon saving your JWKS credentials, we will set up the integration within 24 business hours and email you to confirm.  If in doubt, you can get in touch with us [on Discord](https://discord.gg/KS9MRaTSjx) or email support@zerodev.app.

## Wagmi

```typescript
import { JWTWalletConnector } from '@zerodev/wagmi'

const jwtConnector = new JWTWalletConnector({options: {
    projectId: '<your-project-id>',
    jwt: "<your user's JWT token>"
}})
```

Example:

:::info
For each connection, we assign a new userID, which in turn creates a new wallet or address. In a real-life scenario, the userID would remain constant, ensuring that the wallet and address also remain constant.
:::

```jsx live folded
function WagmiJWTExample() {
    const [jwt, setJWT] = useState('')
    const userId = window.crypto.getRandomValues(new Uint32Array(4)).join('-')

    useEffect(() => {
        fetch(`https://jwt-issuer.onrender.com/create-jwt/${userId}`).then(response => {
            response.text().then(setJWT)
        })
    }, [])

    const { chains, publicClient, webSocketPublicClient } = configureChains(
        [polygonMumbai],
        [infuraProvider({apiKey: infuraApiKey})],
    )
    const config = createConfig({
        autoConnect: false,
        publicClient,
        webSocketPublicClient,
    })

    const jwtConnector = new JWTWalletConnector({chains, options: {
        projectId: defaultProjectId,
        jwt
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
                connector: jwtConnector
            })
            setLoading(false)
        }


        if (isConnected) {
            return (
                <div>
                    <div>{address}</div>
                    <div>Connected to {connector.name}</div>
                    <a href={`${chain.blockExplorers.default.url}/address/${address}`} target="_blank">Explorer</a><br />
                    <button onClick={() => {
                      disconnect()
                      fetch(`https://jwt-issuer.onrender.com/create-jwt/${userId}`).then(response => {
                          response.text().then(setJWT)
                      })
                    }}>Disconnect</button>
                </div>
            )
        }
        return (
            <button disabled={isLoading || loading || !jwt} onClick={connectWallet}>
                {isLoading || loading ? 'loading...' : 'Connect with JWT'}
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

## Ethers

```typescript
import { ZeroDevWeb3Auth } from '@zerodev/web3auth'

let ecdsaProvider: ECDSAProvider
const instance = new ZeroDevWeb3Auth([defaultProjectId])
instance.initialize({onConnect: async () => {
  ecdsaProvider = await ECDSAProvider.init({
    projectId: defaultProjectId,
    owner: getRPCProviderOwner(provider),
  });
}}, 'jwt')

instance.login('jwt', {jwt: '<your-jwt>'})
```

Example:

:::info
For each connection, we assign a new userID, which in turn creates a new wallet or address. In a real-life scenario, the userID would remain constant, ensuring that the wallet and address also remain constant.
:::

```jsx live folded
function RpcProviderExample() {
    const [jwt, setJWT] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const userId = window.crypto.getRandomValues(new Uint32Array(4)).join('-')

    resetJWT = () => {
        fetch(`https://jwt-issuer.onrender.com/create-jwt/${userId}`).then(response => {
            response.text().then(setJWT)
        })
    }

    useEffect(() => {
        // THIS IS DEMO CODE TO CREATE A JWT, YOU WOULD HAVE YOUR OWN WAY TO GET YOUR JWT
        resetJWT()
    }, [])

    const setWallet = async (provider) => {
        const ecdsaProvider = await ECDSAProvider.init({
          projectId: defaultProjectId,
          owner: getRPCProviderOwner(provider),
        });
        setAddress(await ecdsaProvider.getAddress())
    }

    const zeroDevWeb3Auth = useMemo(() => {
        const instance = new ZeroDevWeb3Auth([defaultProjectId])
        instance.initialize({onConnect: async () => {
            setLoading(true)
            setWallet(zeroDevWeb3Auth.provider)
            setLoading(false)
        }}, 'jwt')
        return instance
    }, [])

  const disconnect = async () => {
    await zeroDevWeb3Auth.logout()
    setAddress('')
    resetJWT()
  }

  const handleClick = async () => {
    setLoading(true)
    zeroDevWeb3Auth.login('jwt', {jwt}).then(provider => {
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
        {!connected && <button onClick={handleClick} disabled={loading || !jwt}>{ loading ? 'loading...' : 'Create Wallet with JWT'}</button>}
        {connected && 
          <button onClick={disconnect} disabled={loading}>Disconnect</button>
        }
      </div>
    </div>
  )
}
```

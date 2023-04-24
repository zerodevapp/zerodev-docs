---
sidebar_position: 2
---

# JWT

If your login system uses JWTs, you can use ZeroDev to seamlessly create one smart wallet per unique user, as identified by their JWT.  Follow these steps:

1. Visit the [Dashboard](https://dashboard.zerodev.app/).
2. Click on the top-right menu.
3. Choose `Authentication Providers`.
4. Enter your JWKS credentials in the `JWT Wallet` section.

JWKS stands for JSON Web Key Set. It is a standard for representing a set of cryptographic keys, specifically public keys, in a JSON format. These public keys are used to verify the signatures of JWTs in various security and identity protocols, such as OAuth 2.0 and OpenID Connect.  If you are unsure how to retrieve your JWKS endpoint, [join our Discord](https://discord.gg/KS9MRaTSjx) and ask.

Currently, integrating with JWTs involves some manual setup on our side.  Upon saving your JWKS credentials, we will set up the integration within 24 business hours and email you to confirm.  If in doubt, you can get in touch with us [on Discord](https://discord.gg/KS9MRaTSjx) or email support@zerodev.app.

## Wagmi

```typescript
import { JWTWalletConnector } from '@zerodevapp/web3auth'

const jwtConnector = new JWTWalletConnector({options: {
    projectId: '<your-project-id>',
    jwt: "<your user's JWT token>"
}})
```

Example:

```jsx live folded
function WagmiJWTExample() {
    const [jwt, setJWT] = useState('')

    useEffect(() => {
        fetch('https://jwt-issuer.onrender.com/create-jwt/1').then(response => {
            response.text().then(setJWT)
        })
    }, [])

    const { chains, provider, webSocketProvider } = configureChains(
        [polygonMumbai],
        [publicProvider()],
    )
    const client = createClient({
        autoConnect: false,
        provider,
        webSocketProvider,
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
                      fetch('https://jwt-issuer.onrender.com/create-jwt/1').then(response => {
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
    <WagmiConfig client={client}>
      <ConnectButton />
    </WagmiConfig>
  )
}
```

## Ethers

```typescript
import { ZeroDevWeb3Auth } from '@zerodevapp/web3auth'

let signer: ZeroDevSigner
const instance = new ZeroDevWeb3Auth(defaultProjectId)
instance.init({onConnect: async () => {
    signer = await getZeroDevSigner({
        projectId: defaultProjectId,
        owner: await getRPCProviderOwner(provider)
    })
}})

zeroDevWeb3Auth.connect('jwt', {jwt: '<your-jwt>'})
```

Example:

```jsx live folded
function RpcProviderExample() {
    const [jwt, setJWT] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)

    resetJWT = () => {
        fetch('https://jwt-issuer.onrender.com/create-jwt/1').then(response => {
            response.text().then(setJWT)
        })
    }

    useEffect(() => {
        // THIS IS DEMO CODE TO CREATE A JWT, YOU WOULD HAVE YOUR OWN WAY TO GET YOUR JWT
        resetJWT()
    }, [])

    const setWallet = async (provider) => {
        const signer = await getZeroDevSigner({
            projectId: defaultProjectId,
            owner: await getRPCProviderOwner(provider)
        })
        setAddress(await signer.getAddress())
    }

    const zeroDevWeb3Auth = useMemo(() => {
        const instance = new ZeroDevWeb3Auth(defaultProjectId)
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
    resetJWT()
  }

  const handleClick = async () => {
    setLoading(true)
    zeroDevWeb3Auth.connect('jwt', {jwt}).then(provider => {
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

---
sidebar_position: 2
---

# JWT (Beta)

You can create wallets for your users by providing your public JWKS credentials through our Dashboard.

1. Visit the [Dashboard](https://staging-dashboard-q1xv.onrender.com/authentication-providers).
2. Click on the top-right menu.
3. Choose `Authentication Providers`.
4. Enter your JWKS credentials in the `JWT Wallet` section.

Upon saving your JWKS credentials, we will set up a [Web3Auth Verifier](https://web3auth.io/docs/auth-provider-setup/verifiers) within the next 24 hours, enabling you to create JWT wallets.

## Wagmi

Example:

```jsx live folded
function WagmiJWTExample() {
    const [jwt, setJWT] = useState('')

    resetJWT = () => {
        fetch('https://jwt-issuer.onrender.com/create-jwt/1').then(response => {
            response.text().then(setJWT)
        })

    }

    useEffect(() => {
        // THIS IS DEMO CODE TO CREATE A JWT, YOU WOULD HAVE YOUR OWN WAY TO GET YOUR JWT
        resetJWT()
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
                    <button onClick={disconnect}>Disconnect</button>
                </div>
            )
        }
        return (
            <button disabled={isLoading || loading || !jwt} onClick={connectWallet}>
                {isLoading || loading ? 'loading...' : 'Connect to JWT'}
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

```jsx live folded
function RpcProviderExample() {
    const [jwt, setJWT] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // THIS IS DEMO CODE TO CREATE A JWT, YOU WOULD HAVE YOUR OWN WAY TO GET YOUR JWT
        fetch('https://jwt-issuer.onrender.com/create-jwt/1').then(response => {
            response.text().then(setJWT)
        })
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
        {!connected && <button onClick={handleClick} disabled={loading || !jwt}>{ loading ? 'loading...' : 'Create Wallet'}</button>}
        {connected && 
          <button onClick={disconnect} disabled={loading}>Disconnect</button>
        }
      </div>
    </div>
  )
}
```

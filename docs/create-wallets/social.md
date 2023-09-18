---
sidebar_position: 2
sidebar_label: Social / Email Wallets
---

# Create AA Wallets with Socials/Emails

With ZeroDev, you can create AA wallets for users using their social accounts or emails.  There are two ways to do so:

- [Use Privy](https://docs.zerodev.app/create-wallets/integrations/privy), a popular onboarding solution that natively integrates with ZeroDev.
  - [Live demo](https://zerodev-example.privy.io/)

- Use our "social connectors" which are compatible with Wagmi/Ethers and wallet kits like RainbowKit/ConnectKit.

Read on to learn more about our social connectors.

## API

Social connectors are available in Wagmi and Ethers.

### Wagmi

Install our Wagmi package:

```bash
npm i @zerodev/wagmi
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
} from '@zerodev/wagmi'

const connector = new GoogleSocialWalletConnector({options: {
  projectId: <your-project-id>,
}})
```

Example:

```jsx live folded
function WagmiSocialExample() {

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [infuraProvider({apiKey: infuraApiKey})],
  )
  const config = createConfig({
    autoConnect: false,
    publicClient,
    webSocketPublicClient,
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
    <WagmiConfig config={config}>
      <ConnectButton />
    </WagmiConfig>
  )
}
```

### Ethers

Install the following package:

```bash
npm i @zerodev/web3auth
```

Then import the social wallets and use them with `ECDSAProvider` from the SDK:

```typescript
import { ECDSAProvider, getRPCProviderOwner } from '@zerodev/sdk'
import { ZeroDevWeb3Auth, ZeroDevWeb3AuthWithModal } from '@zerodev/web3auth';

let ecdsaProvider: ECDSAProvider

const zeroDevWeb3AuthNoModal = new ZeroDevWeb3Auth(['<project-id>'])
zeroDevWeb3AuthNoModal.init({onConnect: async () => {
  ecdsaProvider = await ECDSAProvider.init({
    projectId: "<project id>",
    owner: await getRPCProviderOwner(ZeroDevWeb3Auth.provider),
  })
}})
// 'google' | 'facebook' | 'twitter' | 'discord' | 'github' | 'twitch'
ZeroDevWeb3Auth.connect('google')
```

You can pick and choose the social login methods you'd like to use, or use `ZeroDevWeb3Auth` which shows a meta login modal with all login methods.  Here's an example:

```jsx live folded
function RpcProviderExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const setWallet = async (provider) => {
    const ecdsaProvider = await ECDSAProvider.init({
      projectId: defaultProjectId,
      owner: await getRPCProviderOwner(provider)
    })
    setAddress(await ecdsaProvider.getAddress())
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

## Connect Wallet Kits

There are many "connect-wallet kits" out there such as RainbowKit and ConnectKit.  For your convenience, we have built integrations with the most popular kits.

### RainbowKit

You can easily add social logins to [RainbowKit](https://www.rainbowkit.com/) with our helper wallets.  Here is a [complete example](https://github.com/zerodevapp/zerodev-demo).

To import the helper wallets:

```typescript
import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from '@zerodev/wagmi/rainbowkit'
```

These can be used with RainbowKit's `connectorsForWallets` function to customize the wallet list:


```typescript
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
```

```jsx live
function RainbowKitExample() {
  const allowedChains = [polygonMumbai]

  const connectors = connectorsForWallets([
    {
      groupName: 'Social',
      wallets: [
        googleWallet({chains: allowedChains, options: { projectId: defaultProjectId }}),
        facebookWallet({chains: allowedChains, options: { projectId: defaultProjectId }}),
        githubWallet({chains: allowedChains, options: { projectId: defaultProjectId }}),
        discordWallet({chains: allowedChains, options: { projectId: defaultProjectId }}),
        twitchWallet({chains: allowedChains, options: { projectId: defaultProjectId }}),
        twitterWallet({chains: allowedChains, options: { projectId: defaultProjectId }})
      ],
    },
  ]);

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    allowedChains,
    [infuraProvider({apiKey: infuraApiKey})],
  )
  const config = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,
  })

  return (
    <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} modalSize={'compact'}>
            <RainbowKitConnectButton />
        </RainbowKitProvider>
    </WagmiConfig>
  )
}
```

### ConnectKit

Due to the way [ConnectKit](https://docs.family.co/connectkit) is structured, we need a hack to add social logins.  Start by adding this code to your app's initialization flow:

```typescript
import { supportedSocialConnectors } from '@zerodev/wagmi/connectkit'
import { supportedConnectors } from "connectkit";
supportedConnectors.push(...supportedSocialConnectors)
```

Then you can use ConnectKit with our social connectors:

```typescript
import { 
  SocialWalletConnector,
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from '@zerodev/wagmi'

import { createConfig } from "wagmi"

import { getDefaultConfig } from "connectkit"
```

```jsx live
function ConnectKitExample() {
  const chains = [polygonMumbai]
  const options = { chains, options: { projectId: defaultProjectId } } 

  const config = createConfig(getDefaultConfig({
    chains,
    connectors: [
        new GoogleSocialWalletConnector(options),
        new FacebookSocialWalletConnector(options),
        new GithubSocialWalletConnector(options),
        new DiscordSocialWalletConnector(options),
        new TwitchSocialWalletConnector(options),
        new TwitterSocialWalletConnector(options),
        new InjectedConnector(),
    ],
    autoConnect:false,
  }))

  return (
    <WagmiConfig config={config}>
        <ConnectKitProvider theme="midnight">
            <ConnectKitButton />
        </ConnectKitProvider>
    </WagmiConfig>
  )
}
```

### Web3Modal

Configure the Wagmi client with ZeroDev's social connectors, and it will seamlessly work with [Web3Modal](https://web3modal.com/).

```typescript
import { web3ModalConfig } from '@zerodev/wagmi/web3modal'
import { 
  SocialWalletConnector,
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from '@zerodev/wagmi'
import {
  EthereumClient,
  modalConnectors,
  w3mProvider,
  w3mConnectors,
} from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
```

```jsx live
function Web3ModalExample() {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [
      w3mProvider({ projectId: defaultWalletConenctProjectId }),
    ],
  )
  const config = createConfig({
    autoConnect: false,
    connectors: [
      new GoogleSocialWalletConnector({chains, options: {
        projectId: defaultProjectId,
      }}),
      ...w3mConnectors({
        projectId: defaultWalletConenctProjectId,
        version: "2",
        appName: "web3Modal",
        chains,
      }),
    ],
    publicClient,
    webSocketPublicClient,
  })
  const ethereumClient = new EthereumClient(config, chains);
  return (
    <>
      <WagmiConfig config={config}>
        <Web3Button />
      </WagmiConfig>
      <Web3Modal
          {...web3ModalConfig}
          projectId={defaultWalletConenctProjectId}
          ethereumClient={ethereumClient}
      />
    </>
  )
}
```
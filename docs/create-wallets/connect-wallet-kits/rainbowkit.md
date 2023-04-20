---
sidebar_position: 2
---

# RainbowKit

You can easily add social logins to [RainbowKit](https://www.rainbowkit.com/) with our helper wallets:

```typescript
import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from '@zerodevapp/wagmi/rainbowkit'
```

These can be used with RainbowKit's `connectorsForWallets` function to customize the wallet list:


```typescript
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
```

```jsx live folded
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

  const { chains, provider, webSocketProvider } = configureChains(
    allowedChains,
    [publicProvider()],
  )
  const client = createClient({
    autoConnect: false,
    connectors,
    provider,
    webSocketProvider,
  })

  return (
    <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains} modalSize={'compact'}>
            <RainbowKitConnectButton />
        </RainbowKitProvider>
    </WagmiConfig>
  )
}
```

For Web3 wallets like MetaMask, you can use them as they are (as EOA), or "wrap" them with AA using `enhanceWalletWithAAConnector`, in which case the wallet will be used as the signer/owner for your AA wallet.  See this example:


```jsx live folded
function RainbowKitExample() {
  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [publicProvider()],
  )

  const connectors = connectorsForWallets([
    {
      groupName: 'EOA Wrapped with AA',
      wallets: [
        enhanceWalletWithAAConnector(
          metaMaskWallet({ chains }),
          { projectId: defaultProjectId }
        ),
      ],
    },
    {
      groupName: 'EOA',
      wallets: [
        rainbowWallet({ chains }),
      ],
    },
    {
      groupName: 'Social (AA)',
      wallets: [
        googleWallet({options: { projectId: defaultProjectId }}),
      ],
    },
  ]);

  const client = createClient({
    autoConnect: false,
    connectors,
    provider,
    webSocketProvider,
  })

  return (
    <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains} modalSize={'compact'}>
            <RainbowKitConnectButton />
        </RainbowKitProvider>
    </WagmiConfig>
  )
}
```
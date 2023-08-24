---
sidebar_position: 2
---

# RainbowKit

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

For Web3 wallets like MetaMask, you can use them as they are (as EOA), or "wrap" them with AA using `enhanceWalletWithAAConnector`, in which case the wallet will be used as the signer/owner for your AA wallet.  See this example:


```jsx live folded
function RainbowKitExample() {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [infuraProvider({apiKey: infuraApiKey})],
  )

  const connectors = connectorsForWallets([
    {
      groupName: 'EOA Wrapped with AA',
      wallets: [
        enhanceWalletWithAAConnector(
          metaMaskWallet({ chains, projectId: defaultWalletConenctProjectId }),
          { projectId: defaultProjectId }
        ),
      ],
    },
    {
      groupName: 'EOA',
      wallets: [
        rainbowWallet({ chains, projectId: defaultWalletConenctProjectId }),
      ],
    },
    {
      groupName: 'Social (AA)',
      wallets: [
        googleWallet({options: { projectId: defaultProjectId }}),
      ],
    },
  ]);

  const config = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,
  })

  return (
    <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} modalSize={'compact'}>
            <SponsoredMintExample />
        </RainbowKitProvider>
    </WagmiConfig>
  )
}
```
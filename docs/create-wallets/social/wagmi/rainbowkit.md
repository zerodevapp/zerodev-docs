---
sidebar_position: 2
---

# Integrate with RainbowKit

You can easily add social logins to RainbowKit with our helper functions:

```jsx
import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from '@zerodevapp/wagmi/rainbowkit'
```
We also offer the option to extend rainbowkit wallets with AA using `enhanceWalletWithAAConnector`.

Use these with RainbowKit's `connectorsForWallets` function:

```jsx
import {
  connectorsForWallets
} from '@rainbow-me/rainbowkit'

const projectId = "<your-project-id>"

const connectors = connectorsForWallets([
  {
    groupName: 'Social',
    wallets: [
      googleWallet({options: { projectId }}),
      facebookWallet({options: { projectId  }}),
      githubWallet({options: { projectId }}),
      discordWallet({options: { projectId }}),
      twitchWallet({options: { projectId }}),
      twitterWallet({options: { projectId }})
    ],
  },
  {
    groupName: 'Web3',
    wallets: [
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: 'AA Wallets',
    wallets: [
      enhanceWalletWithAAConnector(
        metaMaskWallet({ chains }),
        { projectId }
      ),
    ],
  },
])
```

# Example

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

```jsx live folded
function RainbowKitExample() {
  const connectors = connectorsForWallets([
    {
      groupName: 'Social',
      wallets: [
        googleWallet({options: { projectId: defaultProjectId }}),
        facebookWallet({options: { projectId: defaultProjectId }}),
        githubWallet({options: { projectId: defaultProjectId }}),
        discordWallet({options: { projectId: defaultProjectId }}),
        twitchWallet({options: { projectId: defaultProjectId }}),
        twitterWallet({options: { projectId: defaultProjectId }})
      ],
    },
    {
      groupName: 'Web3',
      wallets: [
        rainbowWallet({ chains }),
        walletConnectWallet({ chains }),
      ],
    },
    {
      groupName: 'AA Wallets',
      wallets: [
        enhanceWalletWithAAConnector(
          metaMaskWallet({ chains }),
          { projectId: defaultProjectId }
        ),
      ],
    },
  ]);

  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
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


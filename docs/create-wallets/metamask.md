---
sidebar_position: 4
sidebar_label: MetaMask (EOA) Wallets
---

# Creating Wallets with MetaMask (EOA)

For Web3 wallets like MetaMask, you can "wrap" them with ZeroDev to produce AA wallets.  In this case, the EOA wallet will be used as the [signer/owner](/create-wallets/overview#choosing-a-signer) for your AA wallet.

To wrap a EOA wallet with AA, use the `enhanceConnectorWithAA` function which will produce a [Wagmi connector](https://wagmi.sh/examples/connect-wallet) that can be used with Wagmi:

```typescript
import { enhanceConnectorWithAA } from '@zerodev/wagmi'
```

See this full example with RainbowKit:


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
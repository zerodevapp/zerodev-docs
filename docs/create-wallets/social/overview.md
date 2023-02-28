---
sidebar_position: 1
sidebar_label: Overview
---

# Create Wallets with Social

ZeroDev makes it easy to create AA wallets, and it doesn't get easier than using social logins.  This allows you to build a powerful Web3 experience where:

- Your users don't need to download wallets and back up seed phrases.
- You app can offer a Web2-level UX through AA features like gas-less transactions, transaction bundling, etc.

Here's an example of how it can look like:

```jsx live folded
function RainbowKitExample() {
  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        googleWallet({options: { projectId: defaultProjectId }}),
        facebookWallet({options: { projectId: defaultProjectId }}),
        githubWallet({options: { projectId: defaultProjectId }}),
        discordWallet({options: { projectId: defaultProjectId }}),
        twitchWallet({options: { projectId: defaultProjectId }}),
        twitterWallet({options: { projectId: defaultProjectId }})
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

If you are using [RainbowKit](/create-wallets/social/wagmi/rainbowkit), [ConnectKit](/create-wallets/social/wagmi/connectkit), or [Web3Modal](/create-wallets/social/wagmi/web3modal) to handle your onboarding flow, check out our guides for them.

Otherwise, check out our [Wagmi](/create-wallets/social/wagmi/overview) and [Ethers](/create-wallets/social/ethers) APIs.

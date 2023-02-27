---
sidebar_position: 1
sidebar_label: Overview
---

# Create Wallets with Social

If you are looking to onboard Web2 users to your app, there is no better way to create AA wallets for them than through social logins.  Here's an example of how it can look like:

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

If you are using [RainbowKit](/create-wallets/social/wagmi/rainbowkit), [ConnectKit](/create-wallets/social/wagmi/connectkit), or [Web3Auth](/create-wallets/social/wagmi/web3auth) to handle your onboarding, we have guides for adding social logins to their flow.

Otherwise, check out our [Wagmi](/create-wallets/social/wagmi/overview) and [Ethers](/create-wallets/social/ethers) APIs.

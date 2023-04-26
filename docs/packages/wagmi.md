---
sidebar_position: 1
---

# @zerodevapp/wagmi

## AutoConnect

Activating the `autoConnect` option for Wagmi requires activating the `shimDisconnect` option on the connector:

```typescript
const connector = new GoogleSocialWalletConnector({options: {
  projectId: defaultProjectId,
  shimDisconnect: true
}})
```


## Chain Switching

Using ZeroDev with multiple chains requires providing multiple `projectId`s via the `projectIds` option. Additionally, supplying the `chains` within the connector is required for chain switching.

```diff
import { polygonMumbai, goerli } from 'wagmi/chains'

const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai, goerli],
    [publicProvider()],
)

const socialConnector = new GoogleWalletConnector({
+   chains, 
    options: {
-     projectId: '<project-id>',
+     projectIds: ['<project-id-1>', '<project-id-2>'],
    }
})
```
```jsx live folded
function RainbowKitExample() {
  const { chains, provider, webSocketProvider } = useMemo(() => configureChains(
    [polygonMumbai, goerli],
    [publicProvider()],
  ), [])

  const connectors = useMemo(() => connectorsForWallets([
    {
      groupName: 'Social',
      wallets: [
        googleWallet({chains, options: { projectIds: [defaultProjectId, goerliProjectId] }}),
        facebookWallet({chains, options: { projectIds: [defaultProjectId, goerliProjectId] }}),
        githubWallet({chains, options: { projectIds: [defaultProjectId, goerliProjectId] }}),
        discordWallet({chains, options: { projectIds: [defaultProjectId, goerliProjectId] }}),
        twitchWallet({chains, options: { projectIds: [defaultProjectId, goerliProjectId] }}),
        twitterWallet({chains, options: { projectIds: [defaultProjectId, goerliProjectId] }})
      ],
    },
  ]), []);

  const client = useMemo(() => createClient({
    autoConnect: false,
    connectors,
    provider,
    webSocketProvider,
  }), [])

  return (
    <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains} modalSize={'compact'}>
            <RainbowKitConnectButton />
        </RainbowKitProvider>
    </WagmiConfig>
  )
}
```

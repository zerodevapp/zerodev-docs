---
sidebar_position: 3
---


# Integrate with ConnectKit

## Installation
Since ConnectKit only supports `injected`, `metaMask`, `coinbaseWallet`, and `walletConnect`, we need to artifically support our social wallets. We do so by extending the `supportedConnectors` constant in `connectkit` with our social wallets. This should be one of the first lines of your application.
```typescript
import { connectKitSupportedConnectors} from '@zerodevapp/wagmi'
import { supportedConnectors } from "connectkit";
supportedConnectors.push(...connectKitSupportedConnectors)
```

## Example

```jsx live folded
function ConnectKitExample() {

  const client = createClient(getDefaultClient({
    chains: [polygonMumbai],
    connectors: [
        new GoogleSocialWalletConnector({options: { projectId: defaultProjectId }}),
        new FacebookSocialWalletConnector({options: { projectId: defaultProjectId }}),
        new GithubSocialWalletConnector({options: { projectId: defaultProjectId }}),
        new DiscordSocialWalletConnector({options: { projectId: defaultProjectId }}),
        new TwitchSocialWalletConnector({options: { projectId: defaultProjectId }}),
        new TwitterSocialWalletConnector({options: { projectId: defaultProjectId }})
    ],
    autoConnect:false,
  }))

  return (
    <WagmiConfig client={client}>
        <ConnectKitProvider>
            <ConnectKitButton />
        </ConnectKitProvider>
    </WagmiConfig>
  )
}
```
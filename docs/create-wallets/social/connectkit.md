---
sidebar_position: 3
---


# ConnectKit

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
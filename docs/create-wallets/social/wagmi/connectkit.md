---
sidebar_position: 3
---


# Integrate with ConnectKit

Due to the way [ConnectKit](https://docs.family.co/connectkit) is structured, we need a hack to add social logins.  Start by adding this code to your app's initialization flow:

```typescript
import { supportedSocialConnectors } from '@zerodevapp/wagmi/connectkit'
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
} from '@zerodevapp/wagmi'

import { createClient } from "wagmi"

import { getDefaultClient } from "connectkit"
```

```jsx live
function ConnectKitExample() {
  const options = { options: { projectId: defaultProjectId } } 

  const client = createClient(getDefaultClient({
    chains: [polygonMumbai],
    connectors: [
        new GoogleSocialWalletConnector(options),
        new FacebookSocialWalletConnector(options),
        new GithubSocialWalletConnector(options),
        new DiscordSocialWalletConnector(options),
        new TwitchSocialWalletConnector(options),
        new TwitterSocialWalletConnector(options),
        new MetaMaskConnector(),
    ],
    autoConnect:false,
  }))

  return (
    <WagmiConfig client={client}>
        <ConnectKitProvider theme="midnight">
            <ConnectKitButton />
        </ConnectKitProvider>
    </WagmiConfig>
  )
}
```
---
sidebar_position: 4
---

# Web3Modal

Configure the Wagmi client with ZeroDev's social connectors, and it will seamlessly work with [Web3Modal](https://web3modal.com/).

```typescript
import { web3ModalConfig } from '@zerodevapp/wagmi/web3modal'
import { 
  SocialWalletConnector,
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from '@zerodevapp/wagmi'
import {
  EthereumClient,
  modalConnectors,
  w3mProvider,
  w3mConnectors,
} from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
```

```jsx live
function Web3ModalExample() {
  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [
      w3mProvider({ projectId: defaultWalletConenctProjectId }),
    ],
  )
  const client = createClient({
    autoConnect: false,
    connectors: [
      new GoogleSocialWalletConnector({options: {
        projectId: defaultProjectId,
      }}),
      ...w3mConnectors({
        projectId: defaultWalletConenctProjectId,
        version: "2",
        appName: "web3Modal",
        chains,
      }),
    ],
    provider,
    webSocketProvider,
  })
  const ethereumClient = new EthereumClient(client, chains);
  return (
    <>
      <WagmiConfig client={client}>
        <Web3Button />
      </WagmiConfig>
      <Web3Modal
          {...web3ModalConfig}
          projectId={defaultWalletConenctProjectId}
          ethereumClient={ethereumClient}
      />
    </>
  )
}
```
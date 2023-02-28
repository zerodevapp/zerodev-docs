---
sidebar_position: 4
sidebar_label: Integrate with Web3Modal
---

# Integrate with Web3Modal

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
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal, Web3Button } from "@web3modal/react";
```

```jsx live folded
function Web3ModalExample() {
  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [
      walletConnectProvider({ projectId: defaultWalletConenctProjectId }),
    ],
  )
  const client = createClient({
    autoConnect: false,
    connectors: [
      new SocialWalletConnector({options: {
        projectId: defaultProjectId,
      }}),
      new GoogleSocialWalletConnector({options: {
        projectId: defaultProjectId,
      }}),
      ...modalConnectors({
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
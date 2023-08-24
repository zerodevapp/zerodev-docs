---
sidebar_position: 4
---

# Web3Modal

Configure the Wagmi client with ZeroDev's social connectors, and it will seamlessly work with [Web3Modal](https://web3modal.com/).

```typescript
import { web3ModalConfig } from '@zerodev/wagmi/web3modal'
import { 
  SocialWalletConnector,
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from '@zerodev/wagmi'
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
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [
      w3mProvider({ projectId: defaultWalletConenctProjectId }),
    ],
  )
  const config = createConfig({
    autoConnect: false,
    connectors: [
      new GoogleSocialWalletConnector({chains, options: {
        projectId: defaultProjectId,
      }}),
      ...w3mConnectors({
        projectId: defaultWalletConenctProjectId,
        version: "2",
        appName: "web3Modal",
        chains,
      }),
    ],
    publicClient,
    webSocketPublicClient,
  })
  const ethereumClient = new EthereumClient(config, chains);
  return (
    <>
      <WagmiConfig config={config}>
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
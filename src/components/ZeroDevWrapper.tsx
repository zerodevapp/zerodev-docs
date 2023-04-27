import React from "react";
import {
  WagmiConfig,
  configureChains,
  createClient,
} from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { polygonMumbai, mainnet } from 'wagmi/chains'
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from '@zerodevapp/wagmi/rainbowkit'

const defaultProjectId = 'b5486fa4-e3d9-450b-8428-646e757c10f6'

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [publicProvider()],
)
const connectors = connectorsForWallets([
  {
    groupName: 'Social',
    wallets: [
    googleWallet({chains, options: { projectId: defaultProjectId }}),
    facebookWallet({chains, options: { projectId: defaultProjectId }}),
    githubWallet({chains, options: { projectId: defaultProjectId }}),
    discordWallet({chains, options: { projectId: defaultProjectId }}),
    twitchWallet({chains, options: { projectId: defaultProjectId }}),
    twitterWallet({chains, options: { projectId: defaultProjectId }})
    ],
  },
]);

const client = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
})

function ZeroDevWrapper({children}) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default ZeroDevWrapper
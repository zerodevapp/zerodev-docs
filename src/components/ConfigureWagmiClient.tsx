import React from 'react';
import { ConnectButton, connectorsForWallets, ZeroKitProvider } from 'zerokit';
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from 'zerokit/wallets';
import { configureChains, mainnet } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: "yIMPY_mNImpdNJqZOJzr9_YljBpeXHQS" }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);
const wagmiClientConfig = {
  autoConnect: true,
  connectors
};

export default () => (
    <ZeroKitProvider projectId="f5359ea1-5124-4051-af8f-220f34bf2f59" wagmiClientConfig={wagmiClientConfig} chains={chains}>
        <ConnectButton />
    </ZeroKitProvider>
)

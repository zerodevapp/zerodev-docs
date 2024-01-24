---
sidebar_position: 1
---

# WalletKit

<img alt="WalletKit" src="/img/walletkit_overview.png" />

[WalletKit](https://walletkit.com) is an all-in-one platform for adding smart, gasless wallets to your app. WalletKit also offers pre-built components for onboarding users with email and social logins, which can be integrated in under 15 minutes using their React SDK or the wagmi connector. Alternatively, build completely bespoke experiences for your users using their Wallets API.

This guide shows you how to use WalletKit's pre-built onboarding components to create a smart contract account powered by ZeroDev.

### Integration Guide

#### Install WalletKit and ZeroDev

```bash [npm]
npm i @walletkit/react-link walletkit-js @zerodev/sdk
```

#### Setup WalletKit

Initialize `WalletKitLink` with your Project ID and wrap your app with `WalletKitProvider`, adding it as close to the root as possible.

You can get your Project ID from the API Keys page in the [WalletKit Dashboard](https://app.walletkit.com).

```ts
import {WalletKitLink} from "@walletkit/react-link"

const wkLink = new WalletKitLink({
  projectId: '<WalletKit-Project-ID>',

  // WalletKit defaults to smart contract based wallets.
  // In this case, we want to create an EOA wallet.
  walletType: 'eoa',
});

export function App() {
  return (
    <WalletKitLinkProvider link={wkLink}>
      ...
    </WalletKitLinkProvider>
  )
}
```

:::tip

If you'd like to integrate WalletKit with wagmi, check out
the [installation docs here](https://docs.walletkit.com/link/installation).

:::

#### Configure ZeroDev's ECDSAProvider

```ts
import {useWalletKitLink, type WalletKitLink} from "@walletkit/react-link"

const walletKit: WalletKitLink = useWalletKitLink()

// Prompt the user to create an EOA wallet using their email or social login.
await walletKit.connect()

// Set the EOA wallet, created by WalletKit, the owner for this smart contract
// account 
const provider = await ECDSAProvider.init({
  projectId: '<Zero-Dev-Project-ID>',
  owner: walletKit.ethereumSigner,
})

// Returns the smart contract account address
await provider.getAddress()
```

---

And that's it 🎉 You can now use the `provider` to [send transactions](/use-wallets/send-transactions) and [sponsor gas](/use-wallets/pay-gas-for-users).
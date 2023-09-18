---
sidebar_position: 1
---

# Privy

:::info
This guide is adopted from [Privy's ZeroDev guide](https://docs.privy.io/guide/guides/zerodev).

Privy is in closed beta.  Email `zerodev@privy.io` to gain priority access to Privy.
:::

[Privy](https://privy.io/) is a leading Web3 onboarding solution that powers the likes of [Friend.tech](https://www.friend.tech), [Blackbird](https://www.blackbird.xyz/), and [Courtyard](https://courtyard.io/).  It supports:

- Connecting to DApps with both Web3 wallets and social accounts.
- Fine-grained control over your wallet connection flow.
- Creating a common user object for your app to easily manage identities and analytics.
- Creating embedded wallets for users who don't have their own wallets.

**You can easily integrate ZeroDev alongside Privy to create smart wallets from your user's embedded or external wallets, allowing you to enhance your app with [gas sponsorship](/use-wallets/pay-gas-for-users), [batched transactions](/use-wallets/batch-transactions), and [more](/use-wallets/overview)!**

Read below to learn how to configure your app to create smart wallets for _all_ your users!

:::tip
Want to see an end-to-end integration of Privy with ZeroDev? Check out [**our example app**](https://github.com/privy-io/zerodev-example)!
:::

<details>
<summary><b>What is an EOA?</b></summary>

An [**EOA, or externally-owned account**](https://ethereum.org/en/developers/docs/accounts/), is any Ethereum account that is controlled by a private key. Privy's embedded wallets and most external wallets (MetaMask, Coinbase Wallet, Rainbow Wallet, etc.) are EOAs.

EOAs differ from **contract accounts**, which are instead controlled by smart contract code and do not have their own private key. ZeroDev's smart wallet is a contract account. Contract accounts have [enhanced capabilites, such as gas sponsorship and batched transactions](https://ethereum.org/en/roadmap/account-abstraction/).

Since they do not have their own private key, contract accounts cannot _directly_ produce signatures and initiate transaction flows. Instead, each contract account is generally "managed" by an EOA, which authorizes actions taken by the contract account via a signature; this EOA is called a **signer**.

In this integration, the user's EOA (from Privy) serves as the signer for their smart wallet (from ZeroDev). The smart wallet (ZeroDev) holds all assets and submits all transactions to the network, but the signer (Privy) is responsible for producing signatures and "kicking off" transaction flows.
</details>

### 1. Install Privy and ZeroDev

In your app's repository, install the [**`@privy-io/react-auth`**](https://www.npmjs.com/package/@privy-io/react-auth) and [**`@zerodev/privy`**](https://www.npmjs.com/package/@zerodev/privy) SDKs:
```sh
npm i @privy-io/react-auth @zerodev/privy
```

### 2. Configure your app's `PrivyProvider`

First, follow the instructions in the [**Privy Quickstart**](https://docs.privy.io/guide/quickstart) to get your app set up with Privy.

Then, update the [**`config.embeddedWallets`**](https://docs.privy.io/reference/react-auth/modules.md#privyclientconfig) property of your [**`PrivyProvider`**](https://docs.privy.io/reference/react-auth/modules.md#privyprovider) to have the following values:
- [**`createOnLogin`**](https://docs.privy.io/reference/react-auth/modules.md#privyclientconfig): **`'users-without-wallets'`**. This will configure Privy to create an embedded wallet for users logging in via a web2 method (email, phone, socials), ensuring that _all_ of your users have a wallet that can be used as an EOA.
- [**`noPromptOnSignature`**](https://docs.privy.io/reference/react-auth/modules.md#privyclientconfig): **`true`**. This will configure Privy to _not_ show its default UIs when your user must sign messages or send transactions. Instead, we recommend you use your own custom UIs for showing users the [`UserOperation`](https://www.alchemy.com/overviews/user-operations)s they sign.

Your [**`PrivyProvider`**](https://docs.privy.io/reference/react-auth/modules.md#privyprovider) should then look like:
```tsx
<PrivyProvider
    appId='insert-your-privy-app-id'
    config={{
        /* Replace this with your desired login methods */
        loginMethods: ['email', 'wallet'],
        /* Replace this with your desired appearance configuration */
        appearance: {
            theme: 'light',
            accentColor: '#676FFF',
            logo: 'your-logo-url'
        }
        embeddedWallets: {
            createOnLogin: true,
            noPromptOnSignature: true
        }
    }}
>
    {/* Your app's components */}
</PrivyProvider>
```

### 3. Add ZeroDev to your app

First, go to the [**ZeroDev dashboard**](https://dashboard.zerodev.app/), set up a new project, and retrieve your ZeroDev **Project ID**. You can configure your ZeroDev project per the instructions [here](/getting-started).

Then, where you render your [**`PrivyProvider`**](https://docs.privy.io/reference/react-auth/modules.md#privyprovider), wrap it with a **`ZeroDevProvider`**. In the **`projectId`** property of the **`ZeroDevProvider`**, add your **Project ID** from the ZeroDev dashboard.

For example, in [NextJS](https://nextjs.org/) or [Create React App](https://create-react-app.dev/), this might look like:


<Tabs>
<TabItem value="nextjs" label="NextJS">

```tsx title=_app.jsx
import type {AppProps} from 'next/app';
import {PrivyProvider} from '@privy-io/react-auth';
import {ZeroDevProvider} from '@zerodev/privy';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <ZeroDevProvider projectId='insert-your-zerodev-project-id'>
                <PrivyProvider
                    appId='insert-your-privy-app-id'
                    config={/* insert your PrivyProvider config */}
                >
                    <Component {...pageProps} />
                </PrivyProvider>
            </ZeroDevProvider>
        </>
    );
}
```

</TabItem>
<TabItem value="cra" label="Create React App">

```tsx title=index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {PrivyProvider} from '@privy-io/react-auth';
import {ZeroDevProvider} from '@zerodev/privy';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ZeroDevProvider projectId='insert-your-zerodev-project-id'>
            <PrivyProvider
                appId='insert-your-privy-app-id'
                config={/* insert your PrivyProvider config */}
            >
                <App />
            </PrivyProvider>
        </ZeroDevProvider>
    </React.StrictMode>
);
```

</TabItem>
</Tabs>

### 4. Just `usePrivySmartAccount`!

With the steps above, when a user logs into your app, they will either create a Privy embedded wallet or have an external wallet (e.g. MetaMask) that can be used as an EOA. Behind-the-scenes, ZeroDev will create a smart wallet for the user, and use this EOA as the smart wallet's signer.

**You can now use the ZeroDev smart wallet from within your app's components, by calling ZeroDev's `usePrivySmartAccount` hook:**
- _Before_ taking any actions with the smart wallet, you should verify that the smart wallet has initialized by inspecting the boolean `zeroDevReady` from `usePrivySmartAccount`.
- Once `zeroDevReady` is `true`, you can _then_ call methods like `sendTransaction` and `getEthereumProvider` to use the smart wallet.

```tsx title='Sending a transaction with the smart wallet'
import {usePrivySmartAccount} from '@zerodev/privy';

const {zeroDevReady, sendTransaction} = usePrivySmartAccount();

if (zeroDevReady) {
    const transactionHash = await sendTransaction({
        to: '0xYourDestinationAddress',
        value: 100000
    });
} else {
    throw new Error('Smart wallet has not yet initialized. Try again once zeroDevReady is true.');
}

```

**`usePrivySmartAccount`** will expose all of the same fields and methods as [**`usePrivy`**](https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface.md), but will override all wallet-related flows ([`signMessage`](https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface.md#signmessage), [`sendTransaction`](https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface.md#sendtransaction), [`getEthereumProvider`](https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface.md#getethereumprovider)) to use the ZeroDev smart wallet _instead_ of the user's EOA.

**That's it! You've configured your app to create smart wallets for all of your users, and can seamlessly add in AA features like [gas sponsorship](/use-wallets/pay-gas-for-users), [batched transactions](/use-wallets/batch-transactions), and [more](/use-wallets/overview).** 🎉
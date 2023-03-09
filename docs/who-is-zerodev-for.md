---
sidebar_position: 2
---

# Who is ZeroDev for?

The AA landscape is becoming increasingly complex, and you might be wondering how ZeroDev fits into the solution space.  This document aims to clarify that.

Broadly speaking, ZeroDev is useful for:

- [Wallets](#zerodev-for-wallets)
- [DApps](#zerodev-for-dapps)
- [Any project that needs to spin up wallets](#zerodev-for-others)

## ZeroDev for Wallets

If you are building a wallet in 2023, it's hard to justfiy NOT making it an AA smart contract wallet.  See the [introduction](/) for the advantages of AA wallets.

A typical AA wallet has the following architecture:

<p align="center">
  <img src="/img/wallet_architecture.png" width="30%" />
</p>

- Wallet app: the off-chain UI and features that your users actually interact with.
- Smart contract account: the on-chain smart contract account that your wallet app is based on.
- ERC-4337 bundler: the infrastructure that submits AA transactions on-chain.

For wallet devs, ZeroDev provides value in the app and account layers (highlighted in blue).  Enterprise plans include bundler access as well, though you can use ZeroDev with any bundler provider.

On the account layer, ZeroDev provides a highly optimized and extensible smart contract account that's compatible with ERC-4337.  An analogy here would be Android -- new phone makers don't build their own mobile OS from scratch, but rather build on top of Android.  ZeroDev is like the Android of smart contract wallets -- we provide a *wallet kernel* that can dramatically shorten your time to market, while ensuring that your wallet is

- Secure
- Performant
- [Customized](/use-wallets/zerodev-plugins/build-your-own-plugin)
- Compatible with AA standards

On the wallet app layer, ZeroDev provides an SDK for you to *interact* with the smart contract account.  It's important to understand that to build a certain smart wallet experience such as "subscriptions" or "batch calls," the account and the app typically need to work in tandem, meaning that you need to program your smart account to support these features, while writing your app code to leverage those features.  ZeroDev simplifies both.

To take the Android analogy further, ZeroDev provides not just a "wallet OS", but also an SDK for building wallet features on top of the OS.

## ZeroDev for DApps

With the rise of account abstraction, DApp developers today face both new problems and new opportunites:

- **Problems**
  - You need to support both EOA wallets and smart contract wallets.
  - To make things worse, there's no standard interface for smart contract wallets (ERC-4337 only defines the *validation* interface and nothing else), so it's hard for a DApp to leverage the power of smart contract wallets (e.g. batching transactions) in a way that works with all smart contract wallets.  This is similar to the problem web developers face with different browsers and devices.

- **Opportunites**:
  - AA wallets are the best solution for onboarding Web2 users -- you can spin up AA wallets embedded inside your app for new users, while allowing them to seamlessly transition to using their own wallets. 
  - AA wallets allow you to build Web3 experiences that are impossible with EOA, not unlike how Chrome enabled web devs to build much more dynamic websites comparing to Internet Explorer.

A typical AA DApp has the following architecture:

<p align="center">
  <img src="/img/dapp_architecture.png" width="80%" />
</p>

For DApps, ZeroDev provides two things (highlighted in blue):

- Embedded AA wallets for onboarding.  These wallets can be integrated with login solutions such as [RainbowKit](/create-wallets/social/wagmi/rainbowkit) and [Web3Modal](/create-wallets/social/wagmi/web3modal).

- SDK for interacting with smart contract wallets.  ZeroDev takes away the complexity of supporting different kinds of smart contract wallets, by providing a "compatibility layer" with a unified interface for interacting with all smart contract wallets.  This allows you to leverage SCW features such as "batching" without caring about which specific SCW the user is using.

## ZeroDev for Others

Some projects that use ZeroDev don't strictly fall under either wallets or DApps, but they all use ZeroDev to spin up AA wallets.  Some examples include:

- "Connect wallets" solutions (e.g. Web3Modal) that want to spin up wallets for users who don't have a wallet.
- Onramps that want to spin up wallets for users who don't have a wallet.
- NFT checkout solutions that want to spin up wallets for users who don't have a wallet. 

Remember -- AA wallets are self-custody wallets with UX that rivals custodial wallets, giving you the best of both worlds.  If you need to create wallets, use ZeroDev.
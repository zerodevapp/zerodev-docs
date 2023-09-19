---
sidebar_position: 1
slug: /
---

# Introduction

## Demo

import SponsoredMintExample from '@site/src/components/SponsoredMintExample';

<SponsoredMintExample label="Try ZeroDev" />

<br/>

## What is ZeroDev?

ZeroDev is a framework for creating, using, and extending **smart wallets** powered by account abstraction (ERC-4337).  With ZeroDev, you can:

- **Create** both custodial and non-custodial AA wallets using ZeroDev, or use ZeroDev on top of wallet-as-a-service (WaaS) solutions such as Web3Auth to turn their EOA wallets into AA wallets.

- **Use** powerful smart wallet *features* such as gas sponsoring, transaction batching, session keys, social recovery, automated transactions, multisig, and more to supercharge your UX.

- **Extend** the smart wallet if the default one doesn't cover your needs, by building custom smart wallet *plugins* that enable advanced wallet logic.

## Who is ZeroDev for?

- **Web 2.5 DApps** can use ZeroDev to embed AA wallets inside their applications, so users can interact with the DApps through AA wallets and enjoy great UX benefits such as gasless transactions.

- **DApps and protocols** can use ZeroDev to build advanced functionalities that are only possible with AA.  For example, a lending pool might use ZeroDev to enable automatic liquidations, and a DEX might use ZeroDev to enable paying gas in the ERC20 tokens being traded, etc.

- **Wallets** can use ZeroDev as an "AA wallet backend," so that they can focus on higher-level concerns such as building a great wallet UI/UX, integrating with protocols, or even building custom AA wallet logic through plugins.

## What ZeroDev is NOT

ZeroDev is NOT a fully-featured wallet.  Rather, it's a *headless wallet* for Web3 developers to embed into their own projects and build a wallet UI on top of.  Think of ZeroDev as a smart wallet backend.

## What are smart wallets?

We use the marketing term "smart wallets" to refer to wallets powered by account abstraction (ERC-4337).  These wallets solve some of the main pain points with Web3 UX:

- You can sponsor gas for your users, so they don't have to onramp before using your app.
- You can batch transactions, so your users don't have to approve multiple transactions in order to perform a single action.
- Your users can send transactions automatically, which enables features such as subscriptions.

And these are just some of the most popular use cases of smart wallets.  Under the hood, smart wallets are powered by smart contracts, so they can be programmed to enable arbitrarily advanced transaction functionalities.

## How to use ZeroDev

If you are completely new to ZeroDev, we recommend starting with [the tutorial](/getting-started).

After that, learn how to [create smart wallets](/create-wallets/overview) for your users.

Then, [enable smart wallet features](/use-wallets/overview) for your users, such as gas sponsoring.

Finally, if necessary, [build smart wallet plugins](/extend-wallets/overview) to enable custom functionalities.
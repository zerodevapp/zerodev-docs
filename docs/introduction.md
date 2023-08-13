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

ZeroDev is a framework for creating, using, and extending **smart wallets** powered by account abstraction (ERC-4337).

- Create: You can create both custodial and non-custodial AA wallets using ZeroDev.  Furthermore, you can use ZeroDev on top of wallet-as-a-service (WaaS) solutions such as Web3Auth to 

- Use: ZeroDev enables powerful smart wallet *features* such as gas sponsoring, transaction batching, automated transactions, session keys, and more.

- Extend: if our smart wallet features don't cover your needs, you can build custom smart wallet *plugins* to enable extra functionalities.

No matter if you are building a wallet or a DApp, you can use ZeroDev to dramatically improve Web3 UX for your users.

## What ZeroDev is NOT

- ZeroDev is NOT a fully-featured wallet.  Rather, it's a *headless* wallet that you can embed into your application or build a wallet UI on top of.

- ZeroDev is NOT a fully-featured onboarding solution.  Rather, it's designed to be integrated with your existing onboarding flow, so that your users get a *smart wallet* after onboarding.

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
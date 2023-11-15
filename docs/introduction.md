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

ZeroDev is an embedded wallet powered by account abstraction (AA).  Using ZeroDev, you can:

- **Create self-custody wallets** for your users that support **Web2 logins** (socials, email, passkeys, etc.), so they don’t need to worry about seed phrases.

- **Sponsor gas** for your users so they don’t need to worry about gas, or let them **pay gas in ERC20 tokens** like USDC or even your own project tokens.

- Simplify user flow by **batching related transactions**, **removing repetitive signing prompts**, and even **automate transactions** for them while they are offline (think subscriptions).

- **Recover wallets** for users if they lose their login credentials.

And these are just some examples!  ZeroDev wallets are **fully programmable** and can support additional features via plugins.

[ZeroDev powers more AA wallets than anyone else today.](https://www.bundlebear.com/factories/all)

## Who is ZeroDev for?

- **Web 2.5 DApps** can use ZeroDev to embed AA wallets inside their applications, so users can interact with the DApps through AA wallets and enjoy great UX benefits such as gasless transactions.

- **DApps and protocols** can use ZeroDev to build advanced functionalities that are only possible with AA.  For example, a lending pool might use ZeroDev to enable automatic liquidations, and a DEX might use ZeroDev to enable paying gas in the ERC20 tokens being traded, etc.

- **Wallets** can use ZeroDev as an "AA wallet backend," so that they can focus on higher-level concerns such as building a great wallet UI/UX, integrating with protocols, or even building custom AA wallet logic through plugins.

## What ZeroDev is NOT

ZeroDev is NOT a fully-featured wallet.  For example, it doesn't have a UI that shows the user's assets and balances.

Rather, ZeroDev is a **headless wallet** for Web3 developers to embed into their own projects and build a wallet UI on top of.  Think of ZeroDev as a smart wallet backend.  This makes ZeroDev perfect for building fully whitelabeled experiences.

## How to use ZeroDev

If you are completely new to ZeroDev, we recommend starting with [the tutorial](/getting-started).

After that, learn how to [create smart wallets](/create-wallets/overview) for your users.

Then, [enable smart wallet features](/use-wallets/overview) for your users, such as gas sponsoring.

Finally, if necessary, [build smart wallet plugins](/extend-wallets/overview) to enable custom functionalities.
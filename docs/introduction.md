---
sidebar_position: 1
slug: /
---

# Introduction

ZeroDev is an SDK for builing Web3 apps powered by account abstraction (AA).

ZeroDev is built on top of [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337), the first practical implementation of account abstraction (AA) on EVM blockchains.

## Create Web3 wallets for users

Like existing Web3 onboarding solutions such as Magic or Web3Auth, ZeroDev creates wallets for your users that support:

- Social logins
- Fiat onramp
- Embedded wallet widgets
- WalletConnect
- And more.

## Build powerful Web3 experiences

But what makes ZeroDev unique is that it creates *smart contract wallets* powered by account abstraction.  As a result, you can build Web3 experiences that are hitherto impossible:

- Sponsor gas for your users.
- Let your users pay gas in ERC20 tokens, such as your own DApp tokens or stablecoins.
- Bundle transactions to vastly speed up (and lower the cost of) complex blockchain interactions, such as depositing liquidity into DeFi protocols.
- Skip confirmations altogether with session keys -- temporary keys bound by  security policies.
- Impose transaction checks before and after a transaction, e.g. to enforce spending limits.
- Flexible account recovery, such as social recovery.
- NFT subscriptions.
- And so much more!

Did we mention that, despite all these great benefits, ZeroDev wallets are still fully non-custodial?

With ZeroDev, you can unlock the power of account abstraction with just 5 lines of code!  Here's an example:

import SponsoredMintExample from '@site/src/components/SponsoredMintExample';

<SponsoredMintExample />

[See here](/category/account-abstraction) for more examples.

## Next Steps

ZeroDev has two components:

- ZeroKit -- an AA wallet widget that supports social logins.
- ZeroDev SDK -- an AA wallet SDK.

If you want to easily create an AA wallet for your users with beautiful UI that supports social logins (in addition to EOA wallet logins), use [ZeroKit](/zerokit/getting-started).

If you want to build a fully customized experience with your own wallet interface, while leveraging the power of AA, start with the [ZeroDev SDK](/sdk/intro).

If you are unsure where to start, try [the tutorial](/tutorial).

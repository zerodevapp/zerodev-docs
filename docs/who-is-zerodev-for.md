---
sidebar_position: 2
---

# Who is ZeroDev for?

With account abstraction (AA), as with any emerging technology, it can be sometimes confusing to figure out whether it's the right fit for your project.  Here we describe some common use cases for account abstraction (and therefore for ZeroDev).

## ZeroDev is for DApps

DApps need a great onboarding solution, especially for users who may be new to Web3.  And Web3 onboarding doesn't get better than AA.

Like traditional Web3 onboarding solutions such as Web3Auth or Magic, ZeroDev also provides a beautiful UI that supports both social and Web3 logins.

But unlike existing solutions, ZeroDev is able to remove the friction of gas, by allowing developers to sponsor gas for users, or let users pay gas in ERC20 tokens (such as the DApp's own tokens).

ZeroDev is also much more than an onboarding solution.  With ZeroDev, your users' AA wallets work in tandem with your DApp to enable powerful Web3 experiences, such as [bundled transactions](/sdk/account-abstraction/bundle-transactions) and [subscriptions](/sdk/account-abstraction/custom-modules).

## ZeroDev is for DeFi

One major pain point in DeFi applications is the difficulty of moving assets in and out of various protocols, which always involves a lot of approving, swapping, etc.

AA significantly improves the experience of DeFi, by allowing transactions to be [bundled](/sdk/account-abstraction/bundle-transactions).  As an example, say you have some USDC and you want to deposit into an Aave DAI pool.  Normally you'd have to swap the USDC for DAI, approve DAI transfer for Aave, and finally deposit the DAI into Aave.  With ZeroDev, you can do all of these in one transaction.

Bundling improves the UX (1 confirmation vs 3), saves time and gas, and more importantly is way safer -- all operations are executed atomically (i.e. operations either all succeed or all revert), so your user won't ever be stuck in an inconsistent state, such as when they swapped USDC for DAI but then realized that they can't put the DAI into the pool after all (e.g. due to increased slippage).

See the [Valha demo](https://zerodev.valha.xyz/) for a great example of how ZeroDev improves DeFi UX.

## ZeroDev is for wallets

ZeroDev can be thought of as a wallet infrastructure.  If you are building a new wallet and wants to take advantage of AA, ZeroDev is a great place to start.

ZeroDev wallets are Gnosis Safes that have been augmented to support ERC-4337.  Gnosis Safe is the most audited and most widely used smart contract wallet to date, so you can be sure that you are building on a solid foundation.

Since ZeroDev supports AA, your wallets will have a significant UX advantage comparing to existing EOA wallets, by virtue of being able to bundle transactions, handle key recovery, pay gas in ERC20 tokens, and more.

## ZeroDev is for onramp

It's a common need for onramps to create wallets for users, since users who are new to Web3 do not have a wallet to deposit crypto into.

Onramps can think of ZeroDev as a wallet API.  Unlikely custodial wallet APIs such as Circle or Fireblocks, ZeroDev is non-custodial -- your users ultimately control their assets.  But just like custodial wallets, ZeroDev wallets are very easy to use.  For example, if a user onramps with USDC, with ZeroDev they can still transfer the USDC even though they have no ETH, because with AA they can pay gas fees in USDC.

## What else?

AA is a new tech, so most use cases have not been thought of yet.  This list is by no means exhaustive and we can't wait to see you build something that no one has dreamed up!
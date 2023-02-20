---
sidebar_position: 1
slug: /
---

# Introduction

ZeroDev is an SDK for creating account abstraction (AA) wallets, which are non-custodial and yet as easy to use as custodial wallets.

ZeroDev is the perfect solution for any project that needs to create wallets for users, including Web2.5 apps, wallet apps, DeFi aggregators, onramps, marketplaces, and more.

## Custodial vs Non-custodial Wallets

Traditionally, there are two approaches to creating wallets:

- Use custodial wallet providers such as [Fireblocks](https://docs.fireblocks.com/api/#create-a-new-vault-account) and [Wyre](https://docs.sendwyre.com/reference/createwallet) to create and manage wallets through APIs.

- Use non-custodial key providers such as [Web3Auth](https://web3auth.io/) and [Magic](https://magic.link/) to generate private keys for users, which they can then use as blockchain wallets (EOA).

The tradeoff here is of UX vs decentralization.  

### Custodial Wallets: amazing UX, terrible decentralization

With a custodial wallet provider, you are ultimately managing wallets for your users, so you can easily hide the complexity of Web3 and create an amazing UX.

There are many downsides, however:

- You are responsible for handling your users's assets.
- Your users don't truly own their assets.
- Your users can't use their assets with other DApps (no interoperability).

### Non-custodial wallets: truly Web3, terrible UX

On the other hand, you can help your users create keys and handle their own assets, either through services like Web3Auth/Magic or some custom solution.  By doing so, your users truly own their assets and can use the assets with the rest of Web3.

The problems however are:

- Your users may lose keys and therefore all their assets.
- Your users will suffer poor UX, since they have to deal with gas, confirmations, etc.

## The Third Way: Account Abstraction Wallets

What if you didn't have to choose between good UX and decentralization?  What if there was a third way?

ZeroDev is the ultimate wallet solution, thanks to account abstraction.  With ZeroDev, you can create non-custodial wallets for users that are as easy to use as custodial wallets, achieving the best of both worlds.

Here's a breakdown of how the wallet solutions compare:

|                                  |Self-custody Wallets|Custodial Wallets                |ZeroDev Wallets                                                                  |
|---------------------------------------|--------------------|---------------------------------|---------------------------------------------------------------------------------|
|Who owns the wallet?                   |User                |App                              |User                                                                             |
|How is the wallet secured?             |Seed phrases        |Web2 logins                      | Flexible (Web2 logins, seed phrases, etc.)|
|Does the user need to install anything?|Yes                 |No                               |No                                                                               |
|Who pays the gas?                      |User                |App                              |App or user                                                                      |
|What tokens can be used for gas?       |ETH                 |ETH                              |ETH or ERC20 tokens                                                              |
|Bundle multiple transactions as one?   |No                  |No                               |Yes                                                                              |
|Programmable security policies?        |No                  |No                               |Yes                                                                              |
|Skip confirmations?                    |No                  |Yes, but can be abused by the app|Yes, and cannot be abused by the app                                             |
|Send transactions for users?        |No                  |Yes, but can be abused by the app|Yes, and cannot be abused by the app                                             |
|Interact with smart contracts?         |Yes                 |Yes, but only through API        |Yes                                                                              |
|Use the wallet on other DApps?         |Yes                 |No                               |Yes                                                                              |


## Next Steps

- Learn how to [create AA wallets](/create-wallets/overview).
- Learn how to [use AA wallets](/use-wallets/overview) to build powerful Web3 experiences.
- If you are ready to code, start with [the tutorial](/get-started).
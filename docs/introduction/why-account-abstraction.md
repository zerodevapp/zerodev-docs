---
sidebar_position: 2
---

# Why Account Abstraction

Traditionally, there are two approaches to managing Web3 wallets:

- Use custodial wallet providers such as [Fireblocks](https://docs.fireblocks.com/api/#create-a-new-vault-account) and [Wyre](https://docs.sendwyre.com/reference/createwallet) to create and manage wallets through APIs.

- Ask users to install non-custodial wallets such as MetaMask, or generate wallets for them with solutions like [Web3Auth](https://web3auth.io/) and [Magic](https://magic.link/).

The tradeoff here is of UX vs decentralization.  

## Custodial Wallets: amazing UX, terrible decentralization

With a custodial wallet provider, you are ultimately managing wallets for your users, so you can easily hide the complexity of Web3 and create an amazing UX.

There are many downsides, however:

- You are responsible for handling your users's assets.
- Your users don't truly own their assets.
- Your users can't use their assets with other DApps (no interoperability).

## Non-custodial wallets: truly Web3, terrible UX

On the other hand, you can help your users manage their own assets, either through their own wallets or through services like Web3Auth/Magic.  By doing so, your users truly own their assets and can use the assets with the rest of Web3.

The problems however are:

- Your users may lose keys and therefore all their assets.
- Your users will suffer poor UX, since they have to deal with gas, confirmations, etc.

## The Third Way: Account Abstraction Wallets

What if you didn't have to choose between good UX and decentralization?  What if there was a third way?

Account abstraction is the ultimate wallet solution.  With AA, you can create non-custodial wallets for users that are as easy to use as custodial wallets, achieving the best of both worlds.

At its core, AA enables your users to use *smart contract wallets*.  While smart contract wallets have been around for a while, the breakthrough of AA is that it made smart contract wallets accessible to the average user, by allowing transactions to be sent directly from the smart contract wallet (whereas before transactions would have to be relayed).

Since smart contract wallets are programmable, it can deal with gas and transactions in highly flexible ways, which is ultimately why you can build amazing UX with account abstraction.

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
|Progressively onboard to self-custody wallets?         |N/A                 |No                               |Yes                                                                              |


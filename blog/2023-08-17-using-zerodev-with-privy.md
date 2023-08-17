---
slug: using-zerodev-with-privy
title: Using ZeroDev with Privy
authors: derek
hide_table_of_contents: true
---

*[Check out this post by Henri Stern](https://www.privy.io/blog/zerodev-partnership) (CEO of Privy) about the Privy + ZeroDev integration.*

Today, we are incredibly excited to announce our partnership with Privy, a leading Web3 onboarding solution trusted by [many](https://courtyard.io/) [well-known](https://www.shibuya.xyz/) [projects](https://www.friend.tech/).  The Privy team deeply understands the importance of good UX, and it’s this fascination with UX that led them to explore account abstraction (AA).

Privy is a great solution for onboarding users who have no prior Web3 experience, since it’s able to handle social logins and create an [embedded wallet](https://docs.privy.io/guide/frontend/embedded/overview) for users with no wallets.  However, users want to *do things* with their wallet, and a user with an empty wallet just can’t do much since they are not able to pay gas.

ZeroDev bridges that gap by bringing account abstraction (AA) to Privy.  Users using Privy’s embedded wallet can now easily send transactions without paying gas, if the DApp is willing to [sponsor gas for the user](https://docs.zerodev.app/use-wallets/pay-gas-for-users).  Furthermore, users are able to leverage all the amazing features that AA has to offer, including [transaction batching](https://docs.zerodev.app/use-wallets/batch-transactions), [paying gas in ERC20s](https://docs.zerodev.app/use-wallets/pay-gas-in-erc20), [session keys](https://docs.zerodev.app/use-wallets/use-session-keys), [and more](https://docs.zerodev.app/use-wallets/overview).

Given our shared commitment to good developer experience, Privy and ZeroDev have developed a helper library for developers to seamlessly integrate the two solutions.  [Get started here with Privy+ZeroDev today!](https://docs.privy.io/guide/guides/zerodev)
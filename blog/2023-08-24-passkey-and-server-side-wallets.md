---
slug: passkey-and-server-side-wallets
title: Creating AA Wallets with Passkeys and User IDs
authors: derek
---

At ZeroDev, we are always looking for more ways to help developers leverage account abstraction (AA).  Today we are happy to announce that we have partnered up with [Turnkey](https://www.turnkey.io/) to enable two new types of AA wallets: passkey wallets and server-side wallets.

## Passkey Wallets

[Passkeys](https://developers.google.com/identity/passkeys) are becoming an increasingly popular alternative to passwords. With passkeys, users authenticate with their hardware devices.  If the device happens to support biometrics, then the user can effectively “sign in” with fingerprints or facial recognition alone.

In the context of ZeroDev, passkeys can be used to authenticate with AA wallets. This enables a powerful experience where your users get to create self-custody AA wallets using biometrics such as Apple’s Face ID or Touch ID, removing the need for safekeeping seed phrases.

Here’s [a simple demo of passkey wallets](https://passkey-demo.onrender.com/).  You can also check out [this demo](https://defifortheworld.com/) from our partner Goldfinch.

[Check out these docs to get started with passkey AA wallets.](https://docs.zerodev.app/create-wallets/passkey)

## Server-Side Wallets

Another common ask from our developers has been a way to “just create a wallet for the user” — that is, creating a wallet for the user without requiring any interaction from the user at all.  This is typically useful in a Web 2.5 scenario, where the user is already identified with some Web2 credentials (e.g. usernames or emails), and you simply want to create and associate an AA wallet with the user.

To address this use case, we built “server-side wallets.”  To create a wallet for a user, all you need to do is to specify a “user ID” — a unique string that identifies the user, which can be your database ID for example.

```tsx
const { ECDSAProvider, getCustodialOwner } = require('@zerodev/sdk')

const ecdsaProvider = await ECDSAProvider.init({
    projectId,
    await getCustodialOwner('any-user-id')
})
```

[Check out these docs to get started with server-side AA wallets.](https://docs.zerodev.app/create-wallets/user-id)

## Partnering with Turnkey

Under the hood, the keys used in passkey and server-side wallets are secured by [Turnkey](https://www.notion.so/Introducing-Passkey-AA-Wallets-and-Server-Side-AA-Wallets-9c802b5142b944f8a88275b9b287f9b7?pvs=21) — a leading solution in secure key infrastructure.

Turnkey uses [Trusted Execution Environments (TEE)](https://docs.turnkey.com/security/secure-enclaves) to run its security-critical services, such as verifying passkeys and generating keys.  Given its architecture, [Turnkey itself is not able to access the raw private key materials](https://docs.turnkey.com/security/non-custodial-key-mgmt) — only the users who are able to authenticate themselves are able to access their private keys.  In the case of passkey AA wallets, these are the end users themselves.  In the case of server-side wallets, these are your backend servers.

Zooming out, this is an interesting case study of **decentralized access to centralized infrastructure**, which is an often under-explored area of blockchain research.  One parallel is [validium rollups](https://ethereum.org/en/developers/docs/scaling/validium/), which are rollups that store transaction data off-chain on centralized infrastructure, sacrificing some degree of decentralization for lower gas costs.  In our case, we store keys on centralized infrastructure, sacrificing some decentralization for better UX.  Whereas validium rollups derives security assurance from redundancy and attestations, we derive security assurance from TEEs.

## Get Started Today

Passkey wallets and server-side wallets have both received amazing feedback during their private beta, and now we are incredibly excited to release them for general usage.  With these new solutions, AA has never been more accessible.  Get started with [passkey AA wallets](https://docs.zerodev.app/create-wallets/passkey) and [server-side AA wallets](https://docs.zerodev.app/create-wallets/user-id) today!
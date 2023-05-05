---
sidebar_position: 1
---

# Overview

To create a smart wallet, you need a **signer**.  A signer is anything that can cryptographically sign messages and transactions, and it's typically (but not always) backed by a ECDSA private key.

Keep in mind that **whoever owns the signer owns the smart wallet.**  The security of your signer is therefore of paramount importance.

Generally speaking, signers can be grouped into the following catogories:

- **Web2 Auth**: for Web2.5 applications, your users might want to login with their Web2/social accounts.  ZeroDev leverages MPC solutions such as Web3Auth to enable signins with OAuth, JWT, Auth0, and more.
  - [OAuth](/create-wallets/web2-auth/oauth/rainbowkit)
  - [JWT](/create-wallets/web2-auth/jwt)
  - [Auth0](/create-wallets/web2-auth/auth0)

- **Wallets-as-a-Service**: there are many "wallets-as-a-service" (WaaS) solutions out there that can act as signers for ZeroDev.  By combining ZeroDev with such a service, you are using these services to handle the onboarding flow, while using ZeroDev as the wallet, getting the best of both worlds.
  - [Magic](/create-wallets/wallets-as-a-service/magic)
  - [Web3Auth](/create-wallets/wallets-as-a-service/web3auth)
  - [Portal](/create-wallets/wallets-as-a-service/portal)
  - [Privy](/create-wallets/wallets-as-a-service/privy)
  - [Rollup](/create-wallets/wallets-as-a-service/rollup)
  - [Dynamic](/create-wallets/wallets-as-a-service/dynamic)

- **Custodial Wallet APIs**: custodial wallet providers like Fireblocks and Turnkey are also wallets-as-a-service, but we put them in a different category since they are typically used as APIs.  By using them with ZeroDev, you essentially get a custodial AA wallet API.
  - [Turnkey](/create-wallets/custodial-wallet-apis/turnkey)
  - [Fireblocks](/create-wallets/custodial-wallet-apis/fireblocks)

- **Custom Keys**: if you already have your own key infrastructure, you can create ZeroDev wallets from private keys directly.
  - [Raw private keys](/create-wallets/custom-keys/raw-private-keys)
  - [Custom signers](/create-wallets/custom-keys/custom-key-providers)

- **Wallet signers**: your users can use their existing EOA wallets as signers.  In this case, every transaction will trigger the EOA wallet to sign a message.

- If none of these works for you, you can create AA wallets using [our API](/create-wallets/api).

## Use ZeroDev with Ethers and Wagmi

Unless otherwise noted, all ZeroDev integrations share the same API.

All integrations return a `ZeroDevSigner` object, which is an implementation of [Ethers Signer](https://docs.ethers.org/v5/api/signer/).  Note that this is not to be confused with the signers we talked about earlier -- here we are talking about Ethers's `Signer` interface specifically.

With a Signer object, you can do anything that you would expect a wallet to do, such as sending transactions, signing messages, getting the address, etc.

For example, here's how you would use a `ZeroDevSigner` to interact with a smart contract (which is exactly the same as how you would use a regular Ethers Signer):

```typescript
import { Contract } from "ethers"

const nftContract = new Contract(contractAddress, contractABI, zerodevSigner)
await nftContract.mint()
```

Of course, the beauty of ZeroDev is that it can do *more* than a regular wallet.  Check out the ["Use AA Wallets"](/use-wallets/overview) document for all smart wallet features.

When using ZeroDev with Wagmi-based solutions such as RainbowKit, you can also use ZeroDev with a Wagmi API.  See the integration docs with those specific solutions for details.
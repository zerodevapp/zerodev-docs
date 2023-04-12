---
sidebar_position: 1
---

# Overview

ZeroDev integrates with most popular onboarding/authentication solutions, so that no matter how you handle authentication, you can create smart wallets for your users.

Broadly speaking, we divide our integrations into the following types.  Click on the onboarding solution that you are using or planning to use.

### "Connect Wallet" kits

- [RainbowKit](/create-wallets/connect-wallet-kits/rainbowkit)
- [ConnectKit](/create-wallets/connect-wallet-kits/connectkit)
- [Web3Modal](/create-wallets/connect-wallet-kits/web3modal)
- [Custom "Connect Wallet" UI](/create-wallets/connect-wallet-kits/custom-connect-wallet)

### Embedded wallet providers

- [Magic](/create-wallets/embedded-wallet-providers/magic)
- [Web3Auth](/create-wallets/embedded-wallet-providers/web3auth)
- [Portal (beta)](/create-wallets/embedded-wallet-providers/portal)
- [Privy (beta)](/create-wallets/embedded-wallet-providers/privy)
- [Dynamic (beta)](/create-wallets/embedded-wallet-providers/dynamic)

### Key infrastructure

- [Private keys](/create-wallets/key-providers/private-keys)
- [Turnkey](/create-wallets/key-providers/turnkey)
- [Fireblocks](/create-wallets/key-providers/fireblocks)
- [Custom key providers](/create-wallets/key-providers/custom-key-providers)

### Web2 auth

- [OAuth / Email](/create-wallets/web2-auth/oauth-email)
- [JWT](/create-wallets/web2-auth/jwt)
- [Auth0](/create-wallets/web2-auth/auth0)

### Wallet API

- If none of the solutions above fits your needs, you can [create ZeroDev AA wallets through our API](/create-wallets/api).

## Use ZeroDev with Ethers and Wagmi

Unless otherwise noted, all ZeroDev integrations share the same API.

All integrations return a `ZeroDevSigner` object, which is an implementation of [Ethers signer](https://docs.ethers.org/v5/api/signer/).  With a signer, you can do anything that you would expect a wallet to do, such as sending transactions, signing messages, getting the address, etc.

For example, here's how you would use a ZeroDev signer to interact with a smart contract (which is exactly the same as how you would use a regular Ethers signer):

```typescript
import { Contract } from "ethers"

const nftContract = new Contract(contractAddress, contractABI, zerodevSigner)
await nftContract.mint()
```

Of course, the beauty of ZeroDev is that it can do *more* than a regular wallet.  Check out the ["Use AA Wallets"](/use-wallets/overview) document for all smart wallet features.

When using ZeroDev with Wagmi-based solutions such as RainbowKit, you can also use ZeroDev with a Wagmi API.  See the integration docs with those specific solutions for details.
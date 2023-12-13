---
sidebar_position: 2
sidebar_label: Passkey Wallets
---

# Creating Passkey Wallets

:::info
Our passkey integration with Turnkey (see below) has been deprecated.  We recommend new projects to [use Dynamic + ZeroDev](/create-wallets/integrations/dynamic) instead.
:::

## Demo

- [Demo from ZeroDev](https://passkey-demo.onrender.com)
  - [Source code](https://github.com/zerodevapp/zerodev-demo/blob/passkey/src/Passkey.tsx)
- [Demo from Goldfinch](https://defifortheworld.com/)

## Intro

[Passkeys](https://developers.google.com/identity/passkeys) are becoming an increasingly popular alternative to passwords.  With passkeys, users can use biometrics such as fingerprints and facial recognition to log into apps.

In the context of ZeroDev, passkeys can be used as the signers/owners for your AA wallets.  This enables a powerful experience where your users get to create self-custody AA wallets using biometrics, without having to remember any seed phrases.

## Installing Dependencies

Make sure you have installed the ZeroDev SDK and a helper package:

```bash
npm i @zerodev/sdk @turnkey/http
```

Or if you are using ZeroDev with Wagmi:

```bash
npm i @zerodev/wagmi @turnkey/http
```

We will be using the Wagmi package in the following examples, since passkeys are most commonly used in the frontend.

## Getting Started

To use a passkey to create an AA wallet, use one of our helper functions to create a passkey ["owner,"](/create-wallets/overview#choosing-a-signer) then use the owner to initialize the wallet.  Here's a minimal example:

```typescript
import { ZeroDevConnector } from "@zerodev/wagmi"
import { createPasskeyOwner } from "@zerodev/sdk/passkey"
import { useConnect, configureChains } from "wagmi"

export const { chains } = configureChains(
  // make sure to specify a chain that corresponds to your ZeroDev project
)
const projectId = 'YOUR_ZERODEV_PROJECT_ID'

function AuthenticateScreen() {
  const handleRegister = async () => {
    connect({
      connector: new ZeroDevConnector({
        chains, options: {
          projectId,
          owner: await createPasskeyOwner({ name: 'Name of your app', projectId })
        }
      })
    })
  }

  const handleLogin = async () => {
    connect({
      connector: new ZeroDevConnector({
        chains, options: {
          projectId,
          owner: await getPasskeyOwner({ projectId })
        }
      })
    })
  }

  return (
    <div>
      <button onClick={handleRegister}> Register </button>
      <button onClick={handleLogin}> Login </button>
    </div>
  )
}
```

As you see from the example, there are two ways to create passkey owners:

- `createPasskeyOwner({ name, projectId })` creates a passkey with a given label (`name`).  This function is commonly used to "sign up" for your app since it creates a new passkey.

```jsx live folded
function CreatePasskeyExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const createPasskey = async () => {
    setLoading(true)
    try {
      const ecdsaProvider = await ECDSAProvider.init({
        projectId: defaultProjectId,
        owner: await createPasskeyOwner({name: 'ZeroDev', projectId: defaultProjectId}),
      })
      setAddress(await ecdsaProvider.getAddress())
    } catch (e) {}
    setLoading(false)
  }

  return (
    <div>
      <div>
      <button onClick={createPasskey} disabled={loading || address}>{ loading ? 'loading...' : 'Create Passkey Wallet'}</button>
      </div>
      {address && 
        <div>
          <label>Wallet: {address}</label>
        </div>
      }
    </div>
  )
}
```

- `getPasskeyOwner({ projectId })` asks the user to select an existing passkey.  This function is commonly used to "log into" your app since it asks the user to select an existing passkey.

```jsx live folded
function CreatePasskeyExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const getPasskey = async () => {
    setLoading(true)
    try {
      const ecdsaProvider = await ECDSAProvider.init({
        projectId: defaultProjectId,
        owner: await getPasskeyOwner({projectId: defaultProjectId}),
      })
      setAddress(await ecdsaProvider.getAddress())
    } catch (e) {}
    setLoading(false)
  }

  return (
    <div>
      <div>
      <button onClick={getPasskey} disabled={loading || address}>{ loading ? 'loading...' : 'Get Passkey Wallet'}</button>
      </div>
      {address && 
        <div>
          <label>Wallet: {address}</label>
        </div>
      }
    </div>
  )
}
```

## Security

This section is for people who want to understand the full security implications of using passkeys with AA wallets.

Generally speaking, there are two ways to achieve "passkey AA wallets:"

1. Program the AA wallets to verify passkey signatures on-chain 
2. Use passkeys to authenticate with a signing service that can produce ECDSA signatures

The first approach, natively verifying passkey signatures on-chain, is the ideal one, since it allows users to sign transactions directly with passkeys, without relying on any intermediaries.  However, this approach is currently impractical -- the best on-chain passkey implementation that we know of costs about 300k gas per transaction, which is prohibitively expensive for most applications.  In order to lower the gas cost, EVM itself likely needs to be upgraded with something like [EIP-7212](https://eips.ethereum.org/EIPS/eip-7212).

The second approach is the one that ZeroDev currently takes.  When a user creates a passkey AA wallet, we are actually using the passkey to authenticate against a third-party signing service called [Turnkey](https://docs.turnkey.com/).

Turnkey's infra is based on [secure enclaves](https://docs.turnkey.com/security/secure-enclaves).  Critically, Turnkey's infra ensures that no party, [not even Turnkey itself](https://docs.turnkey.com/security/non-custodial-key-mgmt#turnkeys-non-custodial-infrastructure), can access the user's private key without the proper credential -- which in this case is the user's passkey.

In other words, we are not actually using the passkeys themselves to sign transactions.  Rather, we are using the passkeys to unlock ECDSA private keys, and then use the ECDSA private keys to sign transactions.  By doing so, we achieve maximal compatibility with existing wallet infra as well gas efficiency, with the caveat that we are relying on a centralized signing service (Turnkey).

While the word "centralized" invokes uneasy feelings, we think that this could still be a good solution for many projects, for the following reasons:

- As previously stated, Turnkey itself cannot access the private keys.  Only the user with the passkey can access their own private key.
- Turnkey's infra runs on AWS, so it enjoys high availability and redundancy.
- Since ZeroDev is an AA wallet, it's always possible to switch the signer from Turnkey to another signer (e.g. native passkeys), should the user decide to secure their assets with a different approach.

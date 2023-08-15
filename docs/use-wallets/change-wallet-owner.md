---
sidebar_position: 5
---

# Change Wallet Owner

:::danger
Updating the owner of your ZeroDev AA wallet is a very dangerous action, since the current owner will lose access to the wallet after the update.  Only do this if you know exactly what you are doing.

If in doubt, please [join our Discord](https://discord.gg/KS9MRaTSjx) and ask questions.
:::

Imagine a house where, for whatever reason, the lock can't be changed.  If someone steals your key, they will gain parmanent access to your house, since you can't change the lock.  The only thing you can do is to move to a new house.  Sounds terrible?

And yet that's how EOA wallets work -- each wallet is like the house and its private key is the key to the house.  Since the address of an EOA wallet is cryptographically linked to the private key, if someone gains access to your private key (or seed phrase), they gain permanent access to your wallet, and the only thing you can do is to move your assets entirely to a new wallet.

On the other hand, AA wallets are like houses where locks can be changed.  This enables a powerful experience known as **progressive onboarding** -- you can create an AA wallet for your user using a custodial or semi-custodial key provider such as Web3Auth, while allowing your user to *take over* their wallet with their own key when they are ready to go fully self-custody.

In the following section, we will show you how to update the owner of the default ZeroDev wallet created with [the ECDSA validator](/create-wallets/overview#choosing-a-validator).  Refer to documentations for the specific validator if you are using another validator such as multisig.

## Update wallet owner

To update the owner of your wallet, call the function `changeOwner`:

```typescript
const { hash } = await ecdsaProvider.changeOwner(<NEW_OWNER_ADDRESS>);
```

Keep in mind that this action is irreversible.  Once the owner has been changed, your original owner would no longer be able to send transactions with the AA wallet.

## Get ZeroDev wallet as the new owner

Since ZeroDev wallet addresses are computed counterfactually from the owner, the address of the wallet is computed from the old owner.  Therefore, when you use the wallet with the new owner, you need to manually specify its address:

```typescript
import { ECDSAValidator } from "@zerodev/sdk"

const ecdsaProvider = await ECDSAProvider.init({
  projectId,
  newOwner,
  opts: {
    accountConfig: { 
      accountAddress: '<ACCOUNT_ADDRESS>'
    },
  }
})
```
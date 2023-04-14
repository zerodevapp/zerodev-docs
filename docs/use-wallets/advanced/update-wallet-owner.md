---
sidebar_position: 2
---

# Update Wallet Owner

:::danger
Updating the owner of your ZeroDev AA wallet is a very dangerous action.  If you lose access to the owner's private key, you will lose access to the wallet.  Only do this if you know exactly what you are doing.

If in doubt, please [join our Discord](https://discord.gg/KS9MRaTSjx) and ask questions.
:::

With a regular EOA wallet, the address is cryptographically linked to the private key.  That's why if someone gains control of your private key / seed phrase, they gain control of your wallet.

With smart contract wallets such as those used in ZeroDev, the address and the private key are decoupled.  In ZeroDev specifically, each account has a single "owner" which is ultimately a private key.  Importantly, you can always "rotate" the key and therefore the owner.  This is potentially useful in many security-related scenarios.

In the following tutorial, we will show how to update the owner of a ZeroDev wallet with a new private key, though in principle the new owner can be any signer (such as an MPC wallet).

## Update owner

To update the owner of your wallet, call the function `transferOwnership` on itself:

```typescript
// `signer` is a ZeroDevSigner
const address = await signer.getAddress()

const selfContract = new Contract(address, [
  'transferOwnership(address _newOwner)',
], signer);

await selfContract.transferOwnership(newOwnerAddress)
```

Keep in mind that this action is irreversible.  Once the owner has been changed, your original owner would no longer be able to send transactions from the AA wallet.

## Get ZeroDev wallet as the new owner

To get a `ZeroDevSigner` instance with the new owner:

```typescript
import { getZeroDevSigner, getPrivateKeyOwner } from '@zerodevapp/sdk'

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: getPrivateKeyOwner(newOwnerPrivateKey),
  address: walletAddress,
})
```

Here:

- `newOwnerPrivateKey` is the private key of the new owner.
- `walletAddress` is the address of the AA wallet.

The reason why you need to manually pass in the address of the AA wallet is that the AA wallet address is computed from the owner, so if you had simply let ZeroDev compute the wallet address for you, it would compute an address based on the new owner, resulting in a different address than the one created from the old owner.  Therefore, we manually set the old wallet address.
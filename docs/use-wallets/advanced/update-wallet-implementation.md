---
sidebar_position: 3
---

# Update Wallet Implementation

ZeroDev wallets are built on top of [Safe](https://safe.global/).  Specifically, ZeroDev wallets are [Safe proxies](https://github.com/safe-global/safe-contracts/blob/e59cf7a0db91c8291c34d72bddc665ee6b10d4bc/contracts/proxies/SafeProxy.sol) which are upgradable by their owners (your users).

The benefits of making ZeroDev wallets upgradable are two-fold:

- Users can opt in to accept updates from ZeroDev for new features, performance improvements, and (hopefully never) bug fixes.

- Users can change their wallet implementation to something else altogether.

## Update to latest ZeroDev wallet

Here's the general flow for updating your ZeroDev wallet to the latest version.

```typescript
// signer is a ZeroDevSigner
signer.update(async (): Promise<boolean> {
  // ask your user to confirm if that'd like to upgrade
  window.confirm("Upgrade your wallet?")
})
```

The `update` function works as follows:

- It checks if there's a newer version of ZeroDev wallet.
- If so, it invokes the given callback.
- If the callback returns `true`, it sends a transaction to update the wallet to the newest version.  Otherwise it does nothing.

The intention for the callback is so you can use it to prompt your user to confirm the update.

Note that ZeroDev wallet updates are very rare events, so it's not necessary for your application 

## Update to another wallet implementation

Updating to another wallet implementation can have serious unintended consequences, due to EVM characteristics such as [dirty storage](https://ethereum-magicians.org/t/almost-self-destructing-selfdestruct-deactivate/11886/23).

If you wish to update your wallet implementation from ZeroDev to something else, please contact the ZeroDev team before you proceed, so we can help you execute the update safely and securely.
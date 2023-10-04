---
sidebar_position: 6
---

# Recovery

:::warning
The recovery plugin is currently in beta and the audit is ongoing.  We do not advise using it in production at the moment.
:::

One key property of smart contract wallets (SCW) is that the *address* and the *signer* are decoupled.  Whereas with EOAs, the account address is cryptographically derived from the private key, with SCWs the account address is independent of the key(s) that control the SCW.  This means that you can *switch signers* for your SCW, which enables you to *recover* your account if your original signer has been lost.

Note that if you have control of your original signer and simply want to switch to a different one, you can simply [change the wallet owner](/use-wallets/change-wallet-owner).

ZeroDev's recovery plugin can be used in two ways: a low-level [recovery API](#api) and a number of high-level [recovery flows](#recovery-flows) that are built on top of the API.

## API

:::info
If you ever feel lost, you can always refer to the [complete recovery examples](https://github.com/zerodevapp/plugin-examples/tree/main/recovery).
:::

ZeroDev's recovery API is designed to be maximally flexible, in order to support different types of [recovery flows](#recovery-flows).  From a high level, here's how the recovery API works:

- You specify a `threshold` for the recovery, which is a number.
- You specify a list of `guardians`, which are accounts that can recover your account for you.
  - In particular, each guardian is specified with a `weight`.  A set of guardians can only recover your account if their combined weight is equal to or greater than the threshold.
- You specify a `delay`, which is the number of seconds that the account will wait before it allows itself to be recovered.  This is a hedge against malicious recovery -- if you notice that your guardians are trying to steal your account, you will have a window of time to cancel the recovery and remove the guardians.

### Enabling recovery

To make an account recoverable, we must explicitly enable recovery for it.  To do so, you must have access to [the wallet object as a `ecdsaProvider`](https://docs.zerodev.app/create-wallets/overview).

```typescript
  const recoveryData = {
    // Guardian addresses with their weights
    guardians: {  
      [guardianAddress1]: 1,
      [guardianAddress2]: 1,
      [guardianAddress3]: 1,
    },
    threshold: 2,
    delaySeconds: 0,
  }

  const recoveryProvider = await RecoveryProvider.init({
    projectId,
    defaultProvider: ecdsaProvider,
    opts: {
      validatorConfig: {
        ...recoveryData,
      },
    },
  })

  const result = await recoveryProvider.enableRecovery()
  await recoveryProvider.waitForUserOperationTransaction(result.hash as Hex)
```

This will send a UserOp that enables recovery.  In this particular example, we are setting up three guardians, each with weight `1`.  Since the threshold is `2`, any two guardians can combine to recover the account.

### Initiating recovery

When your account is lost and you are ready to initiate recovery, you create a *recovery request*:

```typescript
  const recoveryProvider = await RecoveryProvider.init({
    projectId,
    opts: {
      accountConfig: {
        accountAddress: accountAddress,
      },
    },
  })
  const recoveryId = await recoveryProvider.initiateRecovery(newOwnerAddress)
```

Note how you need to specify `accountAddress` which is the address of the AA wallet, as well as `newOwnerAddress` which is the address of the EOA that will be the new signer/owner for the AA wallet.

In the end, you will receive a `recoveryId`.  To complete the recovery, you will need to share this ID with the guardians and ask them to sign, which is what we are going over in the next step.

### Approving recovery

Before we can complete the recovery, enough guardians must "approve" the recovery, until their combined weight reaches the threshold.

To approve a recovery request, simply do this with the guardian:

```typescript
  const guardianRecoveryProvider = await RecoveryProvider.init({
    projectId,
    recoveryId,
    opts: {
      validatorConfig: {
        accountSigner: guardianSigner,
      },
    },
  })

  await guardianRecoveryProvider.signRecovery()
```

Here, `guardianSigner` is the EOA of the guardian, and `recoveryId` is the recovery ID you obtained when you initiated a recovery.

### Completing recovery

To complete the recovery, simply do the following:

```typescript
  const submitterRecoveryProvider = await RecoveryProvider.init({
    projectId,
    recoveryId,
  })

  result = await submitterRecoveryProvider.submitRecovery();
  await submitterRecoveryProvider.waitForUserOperationTransaction(
    result.hash as Hex
  )
```

Note that *anyone* can complete the recovery -- it can be the user itself, a guardian, or even your own server.  As long as you have the recovery ID and enough weight has been collected, you can complete the recovery.

In any case, the transaction to complete the recovery is sent from the AA wallet itself.  This means that the gas for this transaction will be paid by the AA wallet itself or a paymaster.

## Recovery flows

The recovery API described above is suitable for when you need very fine-grained control over your recovery flow.  However, most developers will likely find it easier to leverage our *recovery flows* -- pre-built recovery services built on top of the recovery API.

ZeroDev offers three recovery flows:

- **DApp recovery**: the DApp developer (you) can recover accounts for your users.  Presumably, you would verify their authenticity somehow (e.g. through ID checks) before you execute a recovery for them.

- **Second-factor recovery**: the user associates a second auth factor with their account, which could be a social login, passkey, email, or whatnot.  When they lose their account, they can recover it through the second factor.

- **Social recovery**: the user assigns multiple other users as their guardians.  To recover the account, the user would ask other users to complete the recovery.

Recovery flows are currently in beta -- please email `hello@zerodev.app` or join [our Discord](https://discord.gg/KS9MRaTSjx) to gain access.
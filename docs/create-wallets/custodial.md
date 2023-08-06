---
sidebar_position: 3
sidebar_label: Custodial Wallets
---

# Creating Custodial Wallets

With ZeroDev, you can create "custodial AA wallets" -- wallets whose owners don't directly control their keys.  This has many use cases, including:

- Creating wallets for users on the server side
- Creating wallets for internal admin usage
- Building wallet APIs for your clients to consume

## Downloading the Secret File

To create custodial wallets, you need to download a secret file on [this page on your dashboard](https://dashboard.zerodev.app/custodial).  The file is specific to your account.

**Remember, whoever controls the secret file has access to all custodial wallets.  If you lose the file, you also lose access to all custodial wallets.**  Therefore, for all intents and purposes, you should treat the secret file as you would treat your seed phrase -- never share it and never lose it.

Note that ZeroDev doesn't store any copies of your secret file, which means 1) we don't have access to your custodial wallets, but also 2) we won't be able to recover your secret file if you lose it.

## Creating Custodial Wallets

[Here's a complete example of creating custodial wallets via the SDK.](https://github.com/zerodevapp/custodial-example)

When creating a ZeroDev wallet, you need to specify an "owner", which is anything that can sign transactions.  In this case, we need to create a "custodial owner":

```typescript
const owner = await getCustodialOwner(
     // This can be litlerally anything that identifies the wallet
    'any-user-id',
    {
        // The path to the downloaded custodial.txt
        custodialFilePath: 'custodial.txt',
    }
)
```

Here we specify two arguments:

- A string that uniquely identifies the user.  For example, if you have a database of Web2 users and you want to create a wallet for each of them, you can use the database user ID.
- A path to the secret file that you downloaded.

:::info
If you prefer to store the secret as a string instead of a file, you can also initialize the owner as such:

```typescript
const owner = await getCustodialOwner(
    'any-user-id',
    {
        privateKey: 'first line of the secret file',
        publicKey: 'second line of the secret file',
        keyId: 'third line of the secret file',
    }
)
```
:::

Now, create the AA wallet as you would normally:

```typescript
let ecdsaProvider = await ECDSAProvider.init({
    projectId,
    owner,
});
```

Now you have a custodial AA wallet!

## How Custodial Wallets Work

In our custodial setup, the keys are stored by [Turnkey](https://www.turnkey.io/), a company that specializes in key infrastructure.  Turnkey's infra is set up with secure enclaves such that [even Turnkey the company itself can't access the keys](https://docs.turnkey.com/security/non-custodial-key-mgmt).  Only you, the holder of the secret file, can access the wallets, which is why the wallets are "custodial" from the perspective of your users.
---
sidebar_position: 6
sidebar_label: Server-side Wallets
---

# Creating Server-side Wallets

With ZeroDev, you can create "server-side AA wallets" -- wallets that are created on the server side (and therefore controlled by you).  This has many use cases, including:

- Creating wallets for users without their explicit interactions
- Creating wallets for internal admin usage
- Building wallet APIs for your client application to consume
  - This is particularly useful if your client can't consume our TypeScript SDK.

## Downloading the Secret File

To create server-side wallets, you need to download a secret file on [this page on your dashboard](https://dashboard.zerodev.app/custodial).  The file is specific to your account.

**Remember, whoever controls the secret file has access to all server-side wallets.  If you lose the file, you also lose access to all server-side wallets.**  Therefore, for all intents and purposes, you should treat the secret file as you would treat your seed phrase -- never share it and never lose it.

Note that ZeroDev doesn't store any copies of your secret file, which means 1) we don't have access to your server-side wallets, but also 2) we won't be able to recover your secret file if you lose it.

## Creating Server-side Wallets

[Here's a complete example of creating server-side wallets via the SDK.](https://github.com/zerodevapp/custodial-example)

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

The owner is "custodial" because, from your user's perspective, you (or whoever owns the secret file) are the custody of your users's wallets. 

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

Now you have a server-side AA wallet!

## How Server-side Wallets Work

With server-side wallets, the keys are stored by [Turnkey](https://www.turnkey.io/), a company that specializes in key infrastructure.  Turnkey's infra is set up with secure enclaves such that [even Turnkey the company itself can't access the keys](https://docs.turnkey.com/security/non-custodial-key-mgmt).  Only you, the holder of the secret file, can access the wallets, which is why the wallets are "custodial" from the perspective of your users.
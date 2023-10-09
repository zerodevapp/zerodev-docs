---
sidebar_position: 2
---

# Pay Gas with ERC20 tokens

One superpower of AA wallets like ZeroDev is the ability to pay gas with ERC20 tokens.  ZeroDev currently supports USDC but plans on supporting all major ERC20s.

To pay gas in ERC20s, initialize the AA wallet with the ERC20 token paymaster:

```typescript
const ecdsaProvider = await ECDSAProvider.init({
  projectId, // zeroDev projectId
  owner,
  opts: {
    paymasterConfig: {
      policy: "TOKEN_PAYMASTER",
      gasToken: "USDC",
    },
  },
})
```

Or if you are using the Wagmi social packages:

```typescript
new GoogleSocialWalletConnector({chains, options: {
  // ...other options
  gasToken: 'USDC',
}})
```

Note that [gas sponsoring policies](/use-wallets/pay-gas-for-users) override ERC20 paymaster settings.  That is:

- If no gas sponsoring policy covers the transaction, then the AA wallet owner pays the gas with their ERC20 tokens.
- If any gas sponsoring policy covers the transaction, then you (the developer) sponsor the gas.
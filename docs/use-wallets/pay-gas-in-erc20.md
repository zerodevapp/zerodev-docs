---
sidebar_position: 2
---

# Pay Gas in ERC20

One superpower of AA wallets like ZeroDev is the ability to pay gas in ERC20 tokens.  ZeroDev plans on supporting all major ERC20s.

To pay gas in ERC20s, simply pass the `gasToken` option when you create a `ZeroDevSigner`.  For example, to pay gas in USDC:

```typescript
const signer = await getZeroDevSigner({
  // ...other options
  gasToken: 'USDC',
})
```

Or if you are using the Wagmi social packages:

```typescript
new GoogleSocialWalletConnector({chains, options: {
  // ...other options
  gasToken: 'USDC',
}})
```

Note that the `gasToken` setting overrides all your gas sponsoring policies -- meaning that transactions sent from this `ZeroDevSigner` won't be sponsored.  Rather, the AA wallet owner will be paying for their own gas, in the ERC20 tokens that they specify.

ZeroDev currently supports:

- USDC
- PEPE (mainnet only)
- DAI (upcoming)

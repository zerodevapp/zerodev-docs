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

Three distinct situations may arise when utilizing paying gas in ERC20 in tandem with gas sponsoring policies:
1. If your project does not specify any gas sponsoring policy, then the AA wallet owner pays the gas with their ERC20 tokens.
2. If your project specifies gas sponsoring policies and the transaction is non-compliant, then the AA wallet owner pays the gas with their ERC20 tokens.
3. If your project specifies gas sponsoring policies and the transaction is compliant, then you are paying (sponsoring) the gas.

ZeroDev currently supports:

- USDC
- PEPE (mainnet only)
- DAI (upcoming)

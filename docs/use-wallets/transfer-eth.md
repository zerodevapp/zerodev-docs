---
sidebar_position: 4
---

# Transfer ETH

Since ZeroDev wallets are smart contract wallets, it may not be immediately clear how transferring ETH works.  The API is actually very simple (using Viem in this example):

```javascript
const { hash } = await ecdsaProvider.sendUserOperation({
  target: receiverAddress,
  data: '0x',
  value: amount,
})
```

Basically, send a UserOp with:

- `target` set to the receiver address
- `data` set to `0x`
- `value` set to the amount you want to transfer.
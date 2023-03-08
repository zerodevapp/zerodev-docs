---
sidebar_position: 6
---

# Use Your Own Bundler

ZeroDev partners with [StackUp](https://www.stackup.sh) to provide unlimited bundler access to enterprise plan users, and throttled bundler access for free and developer plan users.

For unlimited bundler access on non-enterprise plans, you may use ZeroDev with your bundler service of choice, such as [StackUp](https://www.stackup.sh/pricing).  To use your own bundler with the SDK, simply pass in a `bundlerUrl` parameter when you initialize an AA wallet:

```typescript
const signer = await getZeroDevSigner({
  // other options...
  bundlerUrl: '<bundler url>',
})
```

Be sure your bundler is running on the same chain as your ZeroDev project does!
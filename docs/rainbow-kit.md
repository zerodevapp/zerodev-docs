---
sidebar_position: 3
---

# RainbowKit

This Kit is build on top of `Rainbow` and `wagami`, therefore fully compatible with these libaries.

```jsx
const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <YourApp />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

```


```diff
-const { chains, provider } = configureChains(
-  [mainnet, polygon, optimism, arbitrum],
-  [
-    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
-    publicProvider()
-  ]
-);

-const { connectors } = getDefaultWallets({
-  appName: 'My RainbowKit App',
-  chains
-});

-const wagmiClient = createClient({
-  autoConnect: true,
-  connectors,
-  provider
-})

const App = () => {
  return (
-    <WagmiConfig client={wagmiClient}>
-      <RainbowKitProvider chains={chains}>
+      <ZeroKitProvider projectId="<your-project-id>">
         <YourApp />
+      </ZeroKitProvider>
-      </RainbowKitProvider>
-    </WagmiConfig>
  );
};
```
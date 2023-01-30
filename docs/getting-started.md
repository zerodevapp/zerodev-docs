---
sidebar_position: 2
---

# Getting Started

### Step 1: Sign up
Fill out the [closed beta signup form](https://docs.google.com/forms/d/e/1FAIpQLSfip6bMIYvd2Z5LDr3IRt-kCEc6x38TybcDe6gk_TRKvT-fMw/viewform) to get a `projectId`.


### Step 2: Installation
```bash npm2yarn
npm install @zerodevapp/zerokit
```

### Step 3: Setup the SDK
You will need your `projectId` here to setup the SDK.
```jsx
import '@zerodev/zerokit/styles.css';
import { ZeroKitProvider } from "@zerodevapp/zerokit";
```
```jsx
<ZeroKitProvider projectId="<your-project-id>">
    <YourApp />
</ZeroKitProvider>
```

### Step 4: Action
```jsx
import { ConnectButton } from "@zerodevapp/zerokit";
```
```jsx live
<ConnectButton label="ZeroDev Wallet" />
```
---
sidebar_position: 9
---

# Particle

**Particle Network** is an intent-centric, modular wallet-as-a-service (WaaS).  By utilizing MPC-TSS for key management, Particle can streamline onboarding via familiar Web2 methods such as Google, emails, and phone numbers.

By combining ZeroDev with Particle, you can use Particle to enable a smooth social login experience, while using ZeroDev as the smart wallet to sponsor gas for users, batch transactions, and more.

## Integration

To use Particle with ZeroDev, use both their provider SDK and their auth SDK:

```typescript
import { ECDSAProvider, getRPCProviderOwner } from "@zerodev/sdk";
import { ParticleNetwork } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";

const particle = new ParticleNetwork({
  projectId: "xx",
  clientKey: "xx",
  appId: "xx",
  // Optionally, other configuration...
});

let ecdsaProvider = await ECDSAProvider.init({
  projectId, // zeroDev projectId
  owner: getRPCProviderOwner(new ParticleProvider(particle.auth)),
});
```

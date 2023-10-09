---
sidebar_position: 7
---

# Infrastructure

If you are familiar with [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337), you might know that UserOps are relayed by servers known as "bundlers."  Furthermore, some paymasters rely on off-chain servers, such as the one ZeroDev uses to sponsor gas for users. 

ZeroDev uses a unique "meta infrastructure" -- we work with various bundler/paymaster providers and shard the traffic among them.  Critically, ZeroDev has developed a transparent fallback mechanism, so that when one bundler or paymaster fails, we transparently fail over to another provider, so the end user doesn't notice any downtime.

Since AA (ERC-4337) is a new technology, downtime is not uncommon with any given AA infra provider -- a fact we learned firsthand through working with many large AA applications.  Therefore, ZeroDev's meta infrastructure has proven critical for serving high-volume AA applications, since it hides the failures of any given infra provider and provides the highest possible uptime by aggregating all infra providers.
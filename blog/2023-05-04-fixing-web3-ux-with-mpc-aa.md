---
slug: fixing-web3-ux-with-mpc-aa
title: Fixing Web3 with MPC+AA
authors: derek
hide_table_of_contents: true
---

*(This post is cross-posted from [the Portal blog](https://www.portalhq.io/post/mpc-and-account-abstraction) and jointly authored with Parsa Attari.)*

Today, **[Portal](https://www.portalhq.io/)** and **[ZeroDev](https://zerodev.app/)** are excited to announce the development of the first MPC + Account Abstraction (AA) wallet-as-a-service.

<p align="center">
  <img src="/img/portal_zerodev.png" width="80%" />
</p>

If you’ve been following the conversations around web3 UX, you know that MPC and AA are the two solutions most commonly brought up as the “next big thing.” In fact, we’ve seen countless arguments about which one is better.

But, far from being competing technologies, we believe MPC and AA are in fact incredibly synergetic, and when combined can unlock a level of UX that’s impossible to achieve with each technology alone.

# **What are MPC and Account Abstraction?**

Let’s first clear up the concepts — what are MPC and AA exactly?

## **Multi-Party Computation (MPC)**

Multi-Party Computation (MPC) enables users to have multiple key shares across devices instead of a single private key on a single device to manage access to a crypto wallet. MPC protects users from phishing attacks and the risk of losing a seed phrase by removing the single point of failure created by one key on one device.

Portal offers a two key share solution backed by a Threshold Signature Scheme (an application of MPC) to offer companies wallet-as-a-service. Portal wallets have backup and recovery methods to protect users against lost and compromised devices.

## **Account Abstraction (AA)**

Today on Ethereum, every single transaction must be initiated by an Externally Owned Account (EOA) — the kind of account managed by traditional wallets like MetaMask. EOAs are deeply limiting, however, because the rules for validating EOA transactions are hardcoded into the protocol itself and cannot be changed.

The goal of account abstraction is to enable transactions to be sent from Contract Accounts (CA), which can program their own rules for validating transactions. This unlocks the abilities to sponsor gas for users, batch transactions, automate transactions…just to name a few.

ZeroDev offers a framework for quickly and safely developing AA wallets, by providing a headless AA wallet (aka “Kernel”) and the associated “plugins” that enable the aforementioned AA features.

# **Why do you need AA + MPC?**

To understand why MPC and AA are synergetic, we must look at the lifecycle of a transaction.

In short, a transaction’s life starts *off-chain* and ends *on-chain*. It’s this duality that makes MPC + AA a complete solution for web3 UX.

## **MPC signs transactions off-chain**

When you send a transaction, the first thing you do is to *sign* it. A normal wallet such as MetaMask uses your private key stored locally on the device to sign transactions. As previously stated, storing your private key on a single device opens up opportunities for getting your key stolen or losing your key.

With an MPC wallet like Portal, the transaction is signed by multiple devices. Furthermore, if you ever lose any one of the signing devices, another set of devices can coordinate to recover your key share on the lost device.

## **AA validates transactions on-chain**

Once a transaction has been signed, it’s then broadcast to a network of validators, who then submit the transaction on-chain. This is where AA comes in. For a normal transaction, the validator would check that the transaction is, in fact, valid according to the protocol rules. For an AA transaction, the smart contract wallet itself will check and affirm its validity.

For example, for a normal transaction, if the sender has no ETH, the transaction is automatically rejected by the protocol. For an AA transaction, however, the smart contract can effectively say: “well, even though the sender has no ETH, this other account has agreed to pay ETH for this transaction, so I will let it go through anyway.” This is why AA wallets have “superpowers” like gas sponsorship.

# **How AA and MPC benefit from one another**

As the flow above demonstrates, while MPC makes it easy and secure to handle keys, it does not fundamentally change how transactions are validated, which means we don’t get the benefits of programmable transaction rules such as letting someone else pay gas for you.

Meanwhile, while AA makes transaction validation incredibly flexible, it says nothing about how keys are handled. Therefore, in a vanilla AA solution, the user still needs to worry about securely storing and backing up keys.

By combining MPC and AA, you get easy and secure off-chain **key management**, plus flexible on-chain **transaction validation**. See this table for a detailed breakdown:

<p align="center">
  <img src="/img/portal_mpc_aa_comparison.png" width="100%" />
</p>

# **How MPC + AA Works**

The clean separation between off-chain transaction signing and on-chain transaction validation means that we were able to combine Portal and ZeroDev in a very elegant way.

## **Setting up the MPC+AA wallet**

As with the core Portal product, we start by generating key shares: one on the user’s device and one on Portal’s backend. Portal manages backup and recovery in the case of a new device or general recovery if a share is lost or leaked. All of this is done off-chain, which means no gas!

Using the key generated by Portal, ZeroDev can now deterministically compute the address of the AA wallet. Note that even though the AA wallet is a smart contract wallet, it’s not actually *deployed* at this point — which means you are still not paying any gas. Instead, you can already display the address to users and use it to receive assets.

## **Using the MPC+AA wallet**

When you send a transaction from this wallet, ZeroDev formats the transaction in the ERC-4337 format (technically known as a “UserOperation”). This transaction is then submitted to Portal for signing with MPC. Once the transaction is signed, ZeroDev broadcasts the transaction to the ERC-4337 mempool. A network of bundlers then compete to submit the transaction on-chain.

Once on-chain, the transaction is validated by ZeroDev’s wallet contract. From the perspective of the ZeroDev contract, this transaction is no different than if it was signed by a traditional wallet with a ECDSA key. The fact that the transaction was signed in a multi-party fashion is completely transparent to the ZeroDev wallet contract.

# **Next Steps**

While MPC and AA are both ground-breaking technologies poised to transform web3 UX, combining them takes your user experience to the next level by giving your users a smart wallet whose key can be easily and securely managed.

The Portal+ZeroDev smart wallet is in development today. If you are interested in this product, [sign up for the beta waitlist](https://5g2cefp2j92.typeform.com/to/YK6CiKs0?utm_source=blog_post&utm_medium=xxxxx&utm_campaign=zerodev#hubspot_utk=xxxxx&hubspot_page_name=blogpost&hubspot_page_url=xxxxx). We can’t wait to see what you will build with MPC+AA!
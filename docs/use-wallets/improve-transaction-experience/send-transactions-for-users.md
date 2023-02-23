---
sidebar_position: 5
---

# Send Transactions for Users

## The Status Quo

One great advantage of using custodial wallets is that, since you control the users' wallets, you can send transactions for them, even when they are offline.

For example, let's say that you are building a DeFi app, and your user has put some money into a lending pool (aka "entering a position").  Now, let's say that the position has become risky and might get liquidated soon, but your user is asleep.

If you are using a custodial wallet, then you can offer a very nice feature where you can exit a risky position for your user when they are offline.  This sounds great, except that the user can't know for sure that you won't abuse your power and use their wallets to do shady things.  Just look at what happened to Celsius, FTX, etc.

## Enter AA Wallets

So can we get the best of both worlds?  Can we send transactions for our users, while giving them the peace of mind that you won't be able to abuse your power?

Turns out we can, and the answer is right in front of our eyes: AA wallets (which are smart contract wallets) can authorize a *smart contract* to execute transactions for them.  And due to the immutability of smart contracts, you can rest assured that the authorized smart contract will *only* be able to send a known set of transactions, under a known set of conditions.  These authorized contracts are known as "modules."

Too abstract?  Let's look at an example.

## Tutorial: NFT Subscriptions

### Demo

import SubscribeExample from '@site/src/components/SubscribeExample';

<SubscribeExample />

<br/>

This demo showcases NFT subscription, which is implemented as a module.  In essence, the NFT creator sends transactions for the NFT subscriber through a subscription module, where each transaction sends some payment to the NFT creator, in exchange for an NFT.  Since the module is a smart contract, the NFT subscriber can be sure that the NFT creator cannot abuse the subscription -- that they will pay only as much and as often as the subscription specifies.

To try the demo, make sure to first send yourself some [Polygon Mumbai MATIC](https://faucet.polygon.technology/) to pay for the subscription.

Click the "Subscribe" button, then click the "Release" button to release an NFT to the subscriber.  The release is done by the NFT creator, showcasing that we can charge the subscriber without the subscriber having to send any transaction.

If everything works, after clicking "Release" you should see your NFT balance go up and your MATIC balance go down.

### The smart contract

Here's the module contract we are using.  It has not been audited so do not use it in production.

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@gnosis.pm/zodiac/contracts/core/Module.sol";

interface GnosisSafe {
    /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.
    function execTransactionFromModule(address to, uint256 value, bytes calldata data, Enum.Operation operation)
        external
        returns (bool success);
}

// A Gnosis module that allows a user to subscribe to an ERC721 collection.
//
// The user initializes the module with the ERC721 collection address, how much
// they'd like to pay for each NFT, and how often they'd like to be charged.
//
// A designated address can send the user NFTs from this collection to trigger
// the subscription payments.
contract ERC721SubscriptionModule {

    IERC721 public erc721collection;
    address public sender;
    uint256 public price;
    uint256 public period;

    // map receiver to the timestamp at which they last paid
    mapping(address => uint256) lastPayments;

    // erc721collection: the address of the ERC721 collection we are subscribing to
    // sender: the address that can send NFTs to owner to trigger the subscription payments
    // price: the amount to pay for each NFT
    // period: the minimal amount of time between payments
    constructor(address _erc721collection, address _sender, uint256 _price, uint256 _period) {
        erc721collection = IERC721(_erc721collection);
        sender = _sender;
        price = _price;
        period = _period;
    }

    function triggerPayment(address _receiver, uint256 _tokenId) public {
        // grab the NFT, which presumably has been approved by the sender
        erc721collection.transferFrom(sender, _receiver, _tokenId);

        // revert if the payment period has not elapsed
        uint256 lastPayment = lastPayments[_receiver];
        if (block.timestamp < lastPayment + period) {
            revert("Payment period has not elapsed");
        }

        // pay the subscription fee
        GnosisSafe safe = GnosisSafe(_receiver);
        bool success = safe.execTransactionFromModule(
            address(this),
            price,
            abi.encodePacked(bytes4(keccak256("transferETH()"))),
            Enum.Operation.Call
        );

        if (!success) {
            revert("Payment failed");
        }

        lastPayments[_receiver] = block.timestamp;
    }

    // meant to be delegate called
    function transferETH() payable public {
        (bool sent, ) = sender.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

}
```

It's a long contract, but the gist of it is that:

- In the module's constructor, we specify an NFT collection to subscribe to, a `sender` who will be sending NFTs to subscribers in exchange for payments, the `price` of each NFT, and the `period` of the subscription.

- To subscribe to the NFT collection, an account enables this module (we will explain how).

- The `sender` calls the `triggerPayment` function to send an NFT to a subscriber and receives payment.  `triggerPayment` is programmed such that the `sender` cannot call it more often than what's specified in `period`.

- Inside `triggerPayment`, we execute a transaction from subscriber's account using the `safe.execTransactionFromModule` function.  In this case, the transaction simply transfers ETH to the `sender`.

### Enabling the module

We have already deploy the contract at `0x7ac1ff64156f62dc72dae7c433695042ce5c09c3` on Polygon Mumbai so you don't have to.  Now we just need to enable the module.

To enable a module, use `enableModule`:

```typescript
const module = '0x7ac1ff64156f62dc72dae7c433695042ce5c09c3'

// signer is a ZeroDevSigner
await signer.enableModule(signer, module)
```

### Triggering Payments

To show how different AA features can work beautifully together, we will have the `sender` mint an NFT, approve it for transfer, and send it to the subscriber using `triggerPayment` all in one single bundle:

```jsx
await adminSigner.execBatch([
  {
    to: contractAddress.NFT,
    data: nftContract.interface.encodeFunctionData('mint', [adminAddr]),
  },
  {
    to: contractAddress.NFT,
    data: nftContract.interface.encodeFunctionData('approve', [
      contractAddress.Module,
      tokenId,
    ]),
  },
  {
    to: contractAddress.Module,
    data: moduleContract.interface.encodeFunctionData('triggerPayment', [
      address,
      tokenId,
    ]),
  },
])
```

## API

### Ethers

```typescript
// signer is an instance of ZeroDevSigner
const txn = await signer.enableModule(moduleAddress)
```
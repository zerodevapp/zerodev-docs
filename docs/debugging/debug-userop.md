---
sidebar_position: 1
---

# Debug a UserOp

In [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337), a transaction is known as a "UserOp."  UserOps are difficult to debug because they are not exactly transactions.  Rather, they are "wrapped" inside an actual transaction sent by a [bundler](https://eips.ethereum.org/EIPS/eip-4337#definitions).

This document describes two approaches to debugging a failed UserOp.

## Using ZeroDev's UserOp Debugger

The simplest approach is using our debugging utility.  [Follow the instructions here to get started.](https://github.com/zerodevapp/userop_debugger)

## Using Tenderly

### Case #1: UserOp reverts but the bundle transaction was sent

#### Step 1: Obtain transaction hash

To debug your UserOp, the first step is to find the transaction hash of the bundle that included your UserOp.

To locate the transaction hash, copy your UserOp hash (which our SDK returns) and search for it on [Jiffyscan](https://jiffyscan.xyz/).

On Jiffyscan, you will be able to see the transaction hash of the bundle. Copy this transaction hash for the next steps.

#### Step 2: Use Tenderly to view stack trace

Go to [Tenderly](https://tenderly.co) and log into the dashboard (you can create a free account).  Search for the transaction with the hash.

This will display the call stack for the bundle transaction.  Look for the reverts.

### Case #2: UserOp not sent by bundler

If the UserOp wasn't actually submitted on-chain for whatever reason, you will need to simulate it.

NOTE: This method will only work if the smart account has been deployed.

#### Step 1: Get the raw UserOp data

To simulate the UserOp, you need to have the UserOp JSON data.

It doesn't need to be a complete UserOp; all you need is the `userOp.callData` for debugging the execution phase.

#### Step 2: Simulate the UserOp

Go to [Tenderly dashboard](https://tenderly.co), and then click 'Simulator'.

Click 'New Simulation'.

Click 'Insert any address' and paste your wallet address in the 'Contract' section, then select a network for simulation.

Next, click 'Enter Raw Input Data' and paste the userOp.callData.

In the 'Transaction Parameters' section, set the 'From' address to the EntryPoint address (which is `0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789` for the latest 0.6 EntryPoint) as the 'From' address.

Click "Simulate".
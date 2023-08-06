---
sidebar_position: 2
---

# Getting Started

In this tutorial, you will use ZeroDev to send gasless transactions and bundle transactions.

## Create a project

Go to the [ZeroDev dashboard](https://dashboard.zerodev.app/) and create a project for Polygon Mumbai.

<p align="center">
  <img src="/img/dashboard_create_project.png" width="50%" />
</p>

<p align="center">
  <img src="/img/dashboard_project_home.png" width="50%" />
</p>

Note that your project has an ID.  We will be using this ID in one of the later steps.

## Set up gas policies

While we are at the dashboard, let's set up "Gas Policies" -- rules that determine which transactions we will sponsor gas for.

Go to the "Gas Policies" section of you dashboard and create a new "Project Policy":

<p align="center">
  <img src="/img/project_policy.png" width="80%" />
</p>

Here we are saying that we will sponsor up to 100 transactions per minute.

## Install dependencies

Create an empty working directory and initialize it with `npm`:

```bash
mkdir zerodev-tutorial
cd zerodev-tutorial
npm init -y
```

Then install the ZeroDev SDK:

```bash
npm i @zerodevapp/sdk
```

## Send gasless transactions

We will now implement a simple script that:

1. Creates an AA wallet from a private key
2. Mints an NFT without paying gas

To make things easier, we already deployed an NFT contract on Polygon Mumbai that allows anyone to mint NFTs.

Create a file `app.js` with the following content:

```javascript
const { ECDSAProvider } = require('@zerodevapp/sdk')
const { PrivateKeySigner } = require("@alchemy/aa-core")
const { encodeFunctionData, parseAbi, createPublicClient, http } = require('viem')
const { polygonMumbai } = require('viem/chains')

const projectId = process.env.PROJECT_ID
const owner = PrivateKeySigner.privateKeyToAccountSigner(process.env.PRIVATE_KEY)

const contractAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'
const contractABI = parseAbi([
  'function mint(address _to) public',
  'function balanceOf(address owner) external view returns (uint256 balance)'
])
const publicClient = createPublicClient({
  chain: polygonMumbai,
  // the API is rate limited and for demo purposes only
  // in production, replace this with your own node provider (e.g. Infura/Alchemy)
  transport: http('https://polygon-mumbai.infura.io/v3/f36f7f706a58477884ce6fe89165666c'),
})

const main = async () => {
  // Create the AA wallet
  const ecdsaProvider = await ECDSAProvider.init({
    projectId,
    owner,
  })
  const address = await ecdsaProvider.getAddress()
  console.log('My address:', address)

  // Mint the NFT
  const { hash } = await ecdsaProvider.sendUserOperation({
    target: contractAddress,
    data: encodeFunctionData({
      abi: contractABI,
      functionName: 'mint',
      args: [address],
    }),
  })
  await ecdsaProvider.waitForUserOperationTransaction(hash)

  // Check how many NFTs we have
  const balanceOf = await publicClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [address],
  })
  console.log(`NFT balance: ${balanceOf}`)
}

main().then(() => process.exit(0))
```

Feel free to read the script and see what it's doing.  It should be fairly straightforward.  Note that the ZeroDev SDK is natively compatible with [Viem](https://viem.sh) but you can use it as a [Ethers signer](/packages/sdk#ethers-api) as well

The script requires that we set a project ID and a private key.  We can generate a random private key with this command:

```bash
node -e "console.log(require('ethers').Wallet.createRandom().privateKey)"
```

Then export the variables:

```
export PROJECT_ID="your project ID"
export PRIVATE_KEY="your private key"
```

Make sure to replace the values with your actual project ID and the private key you just generated.

Now run this script:

```bash
node app.js
```

If everything goes well, you should see output like:

```
My address:  0xdc25579151367F44a99E9e92D1E4237200A32Cba
NFT balance: 1
```

Boom!  You just sent a your first gasless AA transaction.  You can go to [the block explorer](https://mumbai.polygonscan.com/) and search for your address, and you should see a transaction under the `ERC-721 Token Txns` section, even though your wallet has no gas.  Magical!

<p align="center">
  <img src="/img/tutorial_account.png" width="70%" />
</p>

:::info
You might wonder why you don't see any transactions in the block explorer.  This is because a ERC-4337 transaction is not a regular transaction.  To see your transactions, use a ERC-4337 explorer such as [JiffyScan](https://app.jiffyscan.xyz/).
:::

Note how our account is identified as a "contract" by the block explorer.  This is because in account abstraction, all accounts are smart contract accounts.

Feel free to run the script a few more times to mint more NFTs.  It's free after all :)

## Bundle transactions

Minting one NFT at a time is cool, but what if we wanna mint two at a time?  With a traditional wallet, you'd have to send two transactions.  With AA, we can bundle multiple transactions and send them as one -- saving the user time and gas.

To mint two NFTs at a time, simply replace this block:

```javascript
  const { hash } = await ecdsaProvider.sendUserOperation([{
    target: contractAddress,
    data: encodeFunctionData({
      abi: contractABI,
      functionName: 'mint',
      args: [address],
    }),
  }])
```

With this block (passing two UserOperations in an array):

```javascript
  const { hash } = await ecdsaProvider.sendUserOperation([{
    target: contractAddress,
    data: encodeFunctionData({
      abi: contractABI,
      functionName: 'mint',
      args: [address],
    }),
  }, {
    target: contractAddress,
    data: encodeFunctionData({
      abi: contractABI,
      functionName: 'mint',
      args: [address],
    }),
  }])
```

Now, run `node app.js` again.  You should see that your NFT balance is now increasing two at a time!

## Next Steps

Now that you have got a taste of ZeroDev, it's time to dive deep into the docs!

- Learn how to [create AA wallets](/create-wallets/overview).
- Learn how to [use AA wallets](/use-wallets/overview) to build powerful Web3 experiences.
---
sidebar_position: 1
---

# @zerodev/sdk

## Ethers API

By default, the ZeroDev SDK interfaces with [Viem](https://viem.sh/), a lightweight [Ethers](https://docs.ethers.org/v5/) alternative.  However, we recognize that Ethers is still the most popular Web3 library, so we also made our SDK compatible with Ethers.

The SDK is compatible with Ethers in two ways:

- You can use Ethers signers as ["owners"](/create-wallets/overview#choosing-a-signer) for your wallet.
- You can use a ZeroDev wallet itself as an Ethers signer.

The following code illustrates both by minting an NFT.  It uses an Ethers signer as the owner and also uses the ZeroDev wallet itself as an Ethers signer to work with an [Ethers Contract](https://docs.ethers.org/v5/api/contract/contract/).

:::info
This is a JavaScript example that uses Ethers v5 and runs on Polygon Mumbai.
:::

```javascript
const { Contract, Wallet } = require('ethers')
const {
  ZeroDevEthersProvider,
  convertEthersSignerToAccountSigner,
} = require('@zerodev/sdk')
const { PrivateKeySigner } = require('@alchemy/aa-core')

// Make sure to set the environment variables
const projectId = process.env.PROJECT_ID
const owner = new Wallet(process.env.PRIVATE_KEY)

const contractAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'
const contractABI = [
  'function mint(address _to) public',
  'function balanceOf(address owner) external view returns (uint256 balance)'
]

const main = async () => {
  // Use the function `ZeroDevEthersProvider` to create an Ethers provider
  const provider = await ZeroDevEthersProvider.init('ECDSA', {
    projectId,
    // Convert an Ethers signer so it's compatible with our SDK
    owner: convertEthersSignerToAccountSigner(owner),
  })

  // Get the signer from the Ethers provider
  const signer = provider.getAccountSigner()

  const address = await signer.getAddress()
  console.log(`My address: ${address}`)

  const nftContract = new Contract(contractAddress, contractABI, signer)

  const receipt = await nftContract.mint(address)
  await receipt.wait()
  console.log(`NFT balance: ${await nftContract.balanceOf(address)}`)
}

main().then(() => process.exit(0))
```

## SDK Options

Please refer to the [SDK README](https://github.com/zerodevapp/sdk#optional-params-for-validatorprovider) for all SDK options.
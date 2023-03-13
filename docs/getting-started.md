---
sidebar_position: 3
---

# Getting Started

In this tutorial, you will learn how to use ZeroDev to build an account abstraction (AA) application.

If you are confused at any point, you can find the full code [here](https://github.com/zerodevapp/zerodev-tutorial).

## Set up the boilerplate

Set up a new ZeroDev project using our React template:

```
npx create-react-app zerodev-tutorial --template zerodev
cd zerodev-tutorial
```

Run the project with `npm start` and make sure you see the "Connect Wallet" button.  Go ahead and connect with one of your social accounts to create an AA wallet.

Right now the boilerplate is using a default API key.  Let's create your own API key in the next step.

## Create a project

Go to the [ZeroDev dashboard](https://dashboard.zerodev.app/) and create a project for Polygon Mumbai.

<p align="center">
  <img src="/img/dashboard_create_project.png" width="50%" />
</p>

<p align="center">
  <img src="/img/dashboard_project_home.png" width="50%" />
</p>

Copy the project ID.  Go to `src/index.tsx` in your code and update the `projectId` to your own project ID.  Make sure you can still login with your social account.

## Set up gas policies

While we are at the dashboard, let's set up "Gas Policies" -- rules that determine which transactions we will sponsor gas for.

Go to the "Gas Policies" section of you dashboard and enter the following into "Global Policies":

<p align="center">
  <img src="/img/global_policies.png" width="80%" />
</p>

Make sure to click "Save".

## Send transactions with Wagmi

For this tutorial, we will build an NFT drop.  We have already deployed the NFT contract on Mumbai at `0x34bE7f35132E97915633BC1fc020364EA5134863`.  The contract has a `mint()` function that anyone can call to mint and receive an NFT.

The tutorial template uses RainbowKit, which is built on [Wagmi](https://wagmi.sh/), so we will be using Wagmi to interact with the contract.  Go to `App.tsx` and replace the content with the following:

```tsx
import { useCallback, useEffect, useRef, useState } from "react";
import './App.css';
import { Contract } from 'ethers'
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useSigner,
} from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ZeroDevSigner } from '@zerodevapp/sdk'

const contractAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'
const contractABI = [
  'function mint(address _to) public',
  'function balanceOf(address owner) external view returns (uint256 balance)'
]

function App() {
  const { address, isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "mint",
    args: [address],
    enabled: true
  });
  const { write: mint, isLoading } = useContractWrite(config);

  const { data: balance = 0, refetch } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    args: [address],
  });

  const interval = useRef<any>()

  const handleClick = useCallback(() => {
    if (mint) {
      mint()
      interval.current = setInterval(() => {
        refetch()
      }, 1000)
    }
  }, [mint, refetch])

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }, [balance, interval]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <ConnectButton />
      {isConnected && (
        <>
          <strong style={{ fontSize: '1.5rem' }}>NFT Count</strong>
          <div style={{ fontSize: '1.5rem' }}>{`${balance ?? 0}`}</div>
          <button
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Mint NFT'}
          </button>
        </>
      )}
    </div>
  );
}
export default App;
```

Now try minting the NFT.  If your NFT balance went up -- congrats!  You've just accomplished the impossible: sending transactions without paying gas.  This is all thanks to the gas sponsoring policies you set up earlier.

## Bundle Transactions with ZeroDev SDK

Minting one NFT at a time is cool, but what if we wanna mint two at a time?  With a traditional wallet, you'd have to send two transactions.  With AA, we can bundle multiple transactions and send them as one -- saving the user time and gas cost.

Add the following code to `App.tsx`:

```tsx
// add this to your component code
  const { data: signer } = useSigner<ZeroDevSigner>()
  const [isBatchMintLoading, setIsBatchMintLoading] = useState(false)
  const batchMint = async () => {
    setIsBatchMintLoading(true)
    const nftContract = new Contract(contractAddress, contractABI, signer!)
    await signer!.execBatch([
      {
        to: contractAddress,
        data: nftContract.interface.encodeFunctionData("mint", [address]),
      },
      {
        to: contractAddress,
        data: nftContract.interface.encodeFunctionData("mint", [address]),
      },
    ])
    interval.current = setInterval(() => {
      refetch()
    }, 1000)
    setIsBatchMintLoading(false)
  }

// add a button to your JSX
          <button
            onClick={batchMint}
            disabled={isBatchMintLoading}
          >
            {isBatchMintLoading ? 'Loading...' : 'Double Mint NFT'}
          </button>
```

Now you should have a "Double Mint NFT" button.  Click that and watch your NFT balance increase by two.  Boom!  We just sent two transactions as one with ZeroDev.

Note that this example is contrived to demonstrate how to use the SDK directly.  In reality, if you are building a Wagmi app, you would use our [Wagmi API](http://localhost:3000/use-wallets/improve-transaction-experience/batch-transactions#wagmi) to implement transaction bundling.

## Next Steps

Now that you have got a taste of ZeroDev, it's time to dive deep into the docs!

- Learn how to [create AA wallets](/create-wallets/overview).
- Learn how to [use AA wallets](/use-wallets/overview) to build powerful Web3 experiences.
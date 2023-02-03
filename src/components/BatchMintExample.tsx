import React, { useEffect } from "react";
import {
  useAccount,
  useContractRead,
  useNetwork,
  useSigner,
} from "wagmi";
import { ConnectButton } from "zerokit";
import { Contract } from 'ethers'
import * as zd from '@zerodevapp/sdk';
import contractAbi from "../../static/contracts/polygon-mumbai/0x34bE7f35132E97915633BC1fc020364EA5134863.json";
import { ZeroKitProvider } from "zerokit";
import { MantineProvider } from '@mantine/core';
import { Button, Anchor } from '@mantine/core';

const nftAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'

function SponsoredMintExample() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork()

  const { data: signer } = useSigner()

  const batchMint = async () => {
    const nftContract = new Contract(nftAddress, contractAbi, signer)
    await zd.execBatch(signer, [
      {
        to: nftAddress,
        data: nftContract.interface.encodeFunctionData("mint", [address]),
      },
      {
        to: nftAddress,
        data: nftContract.interface.encodeFunctionData("mint", [address]),
      },
    ])
  }

  const { data: balance = 0, refetch } = useContractRead({
    address: nftAddress,
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     refetch();
  //   }
  // }, [refetch, isSuccess]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <ConnectButton label="Try Batch Mint" />
      {isConnected && (
        <>
          <strong style={{ fontSize: '1.5rem' }}>NFT Count</strong>
          <div style={{ fontSize: "2rem", fontWeight: 'medium', width: 100, height: 100, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '10px solid #2B8DE3' }}>{`${balance ?? 0}`}</div>
          <Button
            // loading={isLoading}
            size={'lg'}
            onClick={() => batchMint()}
          >
            Batch Mint
          </Button>
          {chain?.blockExplorers?.default.url && <Anchor href={`${chain?.blockExplorers?.default.url}/address/${address}#tokentxnsErc721`} target="_blank">Block Explorer</Anchor>}

        </>
      )}
    </div>
  );
}

export default () => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <ZeroKitProvider projectId="b5486fa4-e3d9-450b-8428-646e757c10f6" modalSize="compact">
      <SponsoredMintExample />
    </ZeroKitProvider>
  </MantineProvider>
)
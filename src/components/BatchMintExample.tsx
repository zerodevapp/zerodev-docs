import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useAccount,
  useContractRead,
  useNetwork,
} from "wagmi";
import { Contract } from 'ethers'
import contractAbi from "../../static/contracts/polygon-mumbai/0x34bE7f35132E97915633BC1fc020364EA5134863.json";
import { MantineProvider } from '@mantine/core';
import { Button, Anchor } from '@mantine/core';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ZeroDevWrapper from "./ZeroDevWrapper";
import { useContractBatchWrite, usePrepareContractBatchWrite } from "@zerodev/wagmi";

const nftAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'

function BatchMintExample() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork()

  const { config } = usePrepareContractBatchWrite({
      calls: [
          {
            address: nftAddress,
            abi: contractAbi,
            functionName: "mint",
            args: [address],
          }, {
            address: nftAddress,
            abi: contractAbi,
            functionName: "mint",
            args: [address],
          }
      ],
      enabled: isConnected
  })

  const { sendUserOperation: batchMint, isLoading } = useContractBatchWrite(config) 

  const { data: balance = 0, refetch } = useContractRead({
    address: nftAddress,
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
    enabled: isConnected
  });

  const interval = useRef<any>()
  const handleClick = useCallback(() => {
    if (batchMint) {
      batchMint()
      interval.current = setInterval(() => {
        refetch()
      }, 1000)
      setTimeout(() => {
        if (interval.current) {
          clearInterval(interval.current)
        }
      }, 100000)
    }
  }, [batchMint, refetch])

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }, [balance, interval]);

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
            loading={isLoading}
            size={'lg'}
            onClick={handleClick}
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
    <ZeroDevWrapper>
      <BatchMintExample />
    </ZeroDevWrapper>
  </MantineProvider>
)
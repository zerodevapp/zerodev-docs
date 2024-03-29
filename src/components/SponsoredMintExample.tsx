import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork
} from "wagmi";
import contractAbi from "../../static/contracts/polygon-mumbai/0x34bE7f35132E97915633BC1fc020364EA5134863.json";
import { MantineProvider } from '@mantine/core';
import { Button, Anchor } from '@mantine/core';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ZeroDevWrapper from "./ZeroDevWrapper";


export function SponsoredMintExample({ label = undefined }) {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork()
  const [balanceChanging, setBalanceChanging] = useState(false)


  const { config } = usePrepareContractWrite({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "mint",
    args: [address],
    enabled: !!address
  });
  const { write: mint, isLoading } = useContractWrite(config);

  const { data: balance = 0, refetch } = useContractRead({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
    enabled: !!address
  });

  useEffect(() => {
    setBalanceChanging(false)
  }, [balance])

  const interval = useRef<any>()

  const handleClick = useCallback(() => {
    if (mint) {
      setBalanceChanging(true)
      mint()
      interval.current = setInterval(() => {
        refetch()
      }, 1000)
      setTimeout(() => {
        if (interval.current) {
          clearInterval(interval.current)
        }
      }, 100000)
    }
  }, [mint, refetch])

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }, [balance, interval]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <ConnectButton label={label || "Try Gasless Mint"} />
      {isConnected && (
        <>
          <strong style={{ fontSize: '1.5rem' }}>NFT Count</strong>
          <div style={{ fontSize: "2rem", fontWeight: 'medium', width: 100, height: 100, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '10px solid #2B8DE3' }}>{`${balance ?? 0}`}</div>
          <Button
            loading={balanceChanging}
            size={'lg'}
            onClick={handleClick}
          >
            Gas-free Mint
          </Button>
          {chain?.blockExplorers?.default.url && <Anchor href={`${chain?.blockExplorers?.default.url}/address/${address}#tokentxnsErc721`} target="_blank">Block Explorer</Anchor>}

        </>
      )}
    </div>
  );
}

export default ({ projectId, label }) => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <ZeroDevWrapper>
      <SponsoredMintExample label={label} />
    </ZeroDevWrapper>
  </MantineProvider>
)
import React, { useCallback, useEffect, useRef } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork
} from "wagmi";
import { ConnectButton } from "zerokit";
import contractAbi from "../../static/contracts/polygon-mumbai/0x34bE7f35132E97915633BC1fc020364EA5134863.json";
import { ZeroKitProvider } from "zerokit";
import { MantineProvider } from '@mantine/core';
import { Button, Anchor } from '@mantine/core';


function SponsoredMintExample({ label = undefined }) {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork()

  const { config } = usePrepareContractWrite({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "mint",
    args: [address],
  });
  const { write: mint, isLoading } = useContractWrite(config);

  const { data: balance = 0, refetch } = useContractRead({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
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
            loading={isLoading}
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
    <ZeroKitProvider projectId={projectId || "b5486fa4-e3d9-450b-8428-646e757c10f6"} modalSize="compact">
      <SponsoredMintExample label={label} />
    </ZeroKitProvider>
  </MantineProvider>
)
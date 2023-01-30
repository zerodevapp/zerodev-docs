import React, { useEffect } from "react";
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
  

function SponsoredMintExample() {
    const { address, isConnected } = useAccount();
    const { chain } = useNetwork()
  
    const { config } = usePrepareContractWrite({
      address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
      abi: contractAbi,
      functionName: "mint",
      args: [address],
    });
    const { write: mint, isLoading, isSuccess } = useContractWrite(config);
  
    const { data: balance = 0, refetch } = useContractRead({
      address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
      abi: contractAbi,
      functionName: "balanceOf",
      args: [address],
    });
  
    useEffect(() => {
      if (isSuccess) {
          refetch();
      }
    }, [refetch, isSuccess]);
  
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column', gap: '1rem'}}>
        <ConnectButton label="Try It" />
        {isConnected && (
          <>
            <strong style={{fontSize: '1.5rem'}}>NFT Count</strong>
            <div style={{ fontSize: "2rem", fontWeight: 'medium', width: 100, height: 100, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '10px solid #2B8DE3'}}>{`${balance ?? 0}`}</div>
            <Button
              loading={isLoading}
              size={'lg'}
              onClick={() => mint()}
            >
              Gas-free Mint
            </Button>
            {chain?.blockExplorers?.default.url && <Anchor href={`${chain?.blockExplorers?.default.url}/address/${address}#tokentxnsErc721`} target="_blank">Block Explorer</Anchor>}
            
          </>
        )}
      </div>
    );
}

export default () => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <ZeroKitProvider projectId="f5359ea1-5124-4051-af8f-220f34bf2f59" modalSize="compact">
        <SponsoredMintExample />
    </ZeroKitProvider>
  </MantineProvider>
)
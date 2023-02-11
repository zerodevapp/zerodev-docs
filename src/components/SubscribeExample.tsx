import React from 'react';
import {
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useContractRead,
    useSigner,
    useBalance,
    useNetwork,
} from 'wagmi';
import nftContractAbi from "../../static/contracts/polygon-mumbai/0x34bE7f35132E97915633BC1fc020364EA5134863.json";
import moduleContractAbi from "../../static/contracts/polygon-mumbai/0x7aC1ff64156f62dC72dAE7c433695042ce5C09c3.json";
import { useEffect, useState } from 'react';
import * as zd from '@zerodevapp/sdk';
import { ethers } from 'ethers';
import { ConnectButton, ZeroKitProvider } from 'zerokit';
import { Anchor, Button, MantineProvider } from '@mantine/core';

// a react component that renders a button
export const SubscribeDemo = () => {
    const { chain } = useNetwork()
    const [balanceLoading, setBalanceLoading] = useState(false);
    const [mintLoading, setMintLoading] = useState(false);
    const [subLoading, setSubLoading] = useState(false);
    const [releaseLoading, setReleaseLoading] = useState(false);

    const { address, isConnected } = useAccount();
    const { refetch: refetchBalance } = useBalance({ address });
    // get signer from wagmi useSigner
    const { data: _signer } = useSigner();
    let signer = _signer as any;

    const { config } = usePrepareContractWrite({
        address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
        abi: nftContractAbi,
        functionName: 'mint',
        args: [address],
    });
    const { write: mint, isLoading } = useContractWrite(config);

    const { data: balance, refetch } = useContractRead({
        address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
        abi: nftContractAbi,
        functionName: 'balanceOf',
        args: [address],
    });

    useEffect(() => {
        if (balanceLoading && !releaseLoading) {
        const timer = setTimeout(() => {
            refetch();
            setBalanceLoading(false);
        }, 12000);

        return () => clearTimeout(timer);
        }
    }, [balanceLoading]);

    const subscribe = async () => {
        await zd.enableModule(signer, "0x7aC1ff64156f62dC72dAE7c433695042ce5C09c3");
    };

    const releaseNFT = async () => {
        try {
        setBalanceLoading(true);
        setReleaseLoading(true);
        // the admin signer that releases NFTs
        const adminSigner = await zd.getSigner({
            projectId: 'b5486fa4-e3d9-450b-8428-646e757c10f6',
            // some random private key we generated
            privateKey:
            '0xe45061378af4e1f368d48f017e5988a7a912476feefdac7f4c328122ada2d95a',
        });
        // should be 0x4F7810B609035Fa48D535A39B69ab82E6E83dC5A
        const adminAddr = await adminSigner.getAddress();
        console.log('admin address', adminAddr);

        const nftContract = new ethers.Contract(
            "0x34bE7f35132E97915633BC1fc020364EA5134863",
            nftContractAbi,
            adminSigner
        );
        const moduleContract = new ethers.Contract(
            "0x7aC1ff64156f62dC72dAE7c433695042ce5C09c3",
            moduleContractAbi,
            adminSigner
        );

        // the token we are about to mint
        const tokenId = await nftContract.tokenId();

        // mint and release the token in a batch transaction
        const tx = await zd.execBatch(adminSigner, [
            {
            to: "0x34bE7f35132E97915633BC1fc020364EA5134863",
            data: nftContract.interface.encodeFunctionData('mint', [adminAddr]),
            },
            {
            to: "0x34bE7f35132E97915633BC1fc020364EA5134863",
            data: nftContract.interface.encodeFunctionData('approve', [
                "0x7aC1ff64156f62dC72dAE7c433695042ce5C09c3",
                tokenId,
            ]),
            },
            {
            to: "0x7aC1ff64156f62dC72dAE7c433695042ce5C09c3",
            data: moduleContract.interface.encodeFunctionData('triggerPayment', [
                address,
                tokenId,
            ]),
            },
        ]);

        await tx.wait();
        } finally {
        setReleaseLoading(false);

        refetch().then(() => {
            setTimeout(() => {
            refetchBalance();
            setBalanceLoading(false);
            }, 1000);
        });
        }
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
            <ConnectButton />
            {isConnected && (
                <>
                <strong style={{fontSize: '1.5rem'}}>NFT Count</strong>
                <div style={{ fontSize: "2rem", fontWeight: 'medium', width: 100, height: 100, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '10px solid #2B8DE3'}}>{`${balance ?? 0}`}</div>
                <Button
                    loading={isLoading}
                    size={'lg'}
                    onClick={() => {
                        if (mint) mint()
                    }}
                >
                    Mint
                </Button>
                <Button
                    loading={subLoading}
                    size={'lg'}
                    onClick={subscribe}
                >
                    Subscribe
                </Button>
                <Button
                    loading={releaseLoading}
                    size={'lg'}
                    onClick={releaseNFT}
                >
                    Release
                </Button>
                {chain?.blockExplorers?.default.url && <Anchor href={`${chain?.blockExplorers?.default.url}/address/${address}#tokentxnsErc721`} target="_blank">Block Explorer</Anchor>}
                
                </>
            )}
        </div>
    )
};

export default ({ projectId }) => (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ZeroKitProvider projectId={projectId || "b5486fa4-e3d9-450b-8428-646e757c10f6"} modalSize="compact">
        <SubscribeDemo />
      </ZeroKitProvider>
    </MantineProvider>
  )
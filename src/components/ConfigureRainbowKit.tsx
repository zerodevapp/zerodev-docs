import React from 'react';
import { ConnectButton, ZeroKitProvider } from 'zerokit';

export default () => (
    <ZeroKitProvider projectId="b5486fa4-e3d9-450b-8428-646e757c10f6" showRecentTransactions>
        <ConnectButton />
    </ZeroKitProvider>
)

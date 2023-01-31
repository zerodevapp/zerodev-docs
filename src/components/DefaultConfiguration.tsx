import React from 'react';
import { ConnectButton, ZeroKitProvider } from 'zerokit';

export default () => (
    <ZeroKitProvider projectId="f5359ea1-5124-4051-af8f-220f34bf2f59">
        <ConnectButton />
    </ZeroKitProvider>
)

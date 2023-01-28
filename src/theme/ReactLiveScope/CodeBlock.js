import CodeBlock from '@theme-original/CodeBlock';
import React from 'react';
import { ZeroKitProvider } from "@zerodevapp/zerokit";

export default function WrappedCodeBlock(props) {
  return (
    <ZeroKitProvider projectId="b5486fa4-e3d9-450b-8428-646e757c10f6" modalSize="compact">
      <CodeBlock {...props} />
    </ZeroKitProvider>
  );
}
import CodeBlock from '@theme-original/CodeBlock';
import React from 'react';
import { ZeroKitProvider } from "@zerodevapp/zerokit";

export default function WrappedCodeBlock(props) {
  return (
    <ZeroKitProvider projectId="f5359ea1-5124-4051-af8f-220f34bf2f59">
      <CodeBlock {...props} />
    </ZeroKitProvider>
  );
}
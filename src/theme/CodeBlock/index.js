import React from 'react';
import Playground from '@theme/Playground';
import ReactLiveScope from '@theme/ReactLiveScope';
import CodeBlock from '@theme-init/CodeBlock';
import { ZeroKitProvider } from "zerokit"

const withLiveEditor = (Component) => {
  function WrappedComponent(props) {
    if (props.live) {
      return (
        <ZeroKitProvider projectId="b5486fa4-e3d9-450b-8428-646e757c10f6">
          <Playground scope={ReactLiveScope} {...props} />
        </ZeroKitProvider>
      )
    }
    return <Component {...props} />
  }
  return WrappedComponent;
};
export default withLiveEditor(CodeBlock);

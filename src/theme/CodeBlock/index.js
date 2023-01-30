import React from 'react';
import Playground from '@theme/Playground';
import ReactLiveScope from '@theme/ReactLiveScope';
import CodeBlock from '@theme-init/CodeBlock';
import { ZeroKitProvider } from "@zerodevapp/zerokit"

const withLiveEditor = (Component) => {
  function WrappedComponent(props) {
    if (props.live) {
      return (
        <ZeroKitProvider projectId="f5359ea1-5124-4051-af8f-220f34bf2f59">
          <Playground scope={ReactLiveScope} {...props} />
        </ZeroKitProvider>
      )
    }
    return <Component {...props} />
  }
  return WrappedComponent;
};
export default withLiveEditor(CodeBlock);

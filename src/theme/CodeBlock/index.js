import React from 'react';
import Playground from '../Playground';
import ReactLiveScope from '@theme/ReactLiveScope';
import CodeBlock from '@theme-init/CodeBlock';

const withLiveEditor = (Component) => {
  function WrappedComponent(props) {
    if (props.live) {
      return (
        <Playground scope={ReactLiveScope} {...props} />
      )
    }
    return <Component {...props} />
  }
  return WrappedComponent;
};
export default withLiveEditor(CodeBlock);

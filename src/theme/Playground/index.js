import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {usePrismTheme} from '@docusaurus/theme-common';
import styles from './styles.module.css';
import Details from '@theme/Details';
import ZeroDevWrapper from '@site/src/components/ZeroDevWrapper';

function Header({children}) {
  return <div className={clsx(styles.playgroundHeader)}>{children}</div>;
}
function LivePreviewLoader() {
  // Is it worth improving/translating?
  // eslint-disable-next-line @docusaurus/no-untranslated-text
  return <div>Loading...</div>;
}

function ResultWithHeader({zerodev = false}) {
  const Wrapper = zerodev ? ZeroDevWrapper : React.Fragment
  return (
    <Wrapper>
      <Header>
        <Translate
          id="theme.Playground.result"
          description="The result label of the live codeblocks">
          Result
        </Translate>
      </Header>
      {/* https://github.com/facebook/docusaurus/issues/5747 */}
      <div className={styles.playgroundPreview}>
        <BrowserOnly fallback={<LivePreviewLoader />}>
          {() => (
            <>
              <LivePreview />
              <LiveError />
            </>
          )}
        </BrowserOnly>
      </div>
    </Wrapper>
  );
}
function ThemedLiveEditor() {
  const isBrowser = useIsBrowser();
  return (
    <LiveEditor
      // We force remount the editor on hydration,
      // otherwise dark prism theme is not applied
      key={String(isBrowser)}
      className={styles.playgroundEditor}
    />
  );
}
function EditorWithHeader({folded = false}) {
  if (folded) {
    return (
      <Details summary={<summary>Full Code (Editable)</summary>}>
        <div>
          <ThemedLiveEditor />
        </div>
      </Details>
    )

  }
  return (
    <>
      <div>
        <Header>
          <Translate
            id="theme.Playground.liveEditor"
            description="The live editor label of the live codeblocks">
            Live Editor
          </Translate>
        </Header>
      </div>
      <ThemedLiveEditor />
    </>
  );
}
export default function Playground({children, transformCode, ...props}) {
  const {
    siteConfig: {themeConfig},
  } = useDocusaurusContext();
  const {
    liveCodeBlock: {playgroundPosition},
  } = themeConfig;
  const prismTheme = usePrismTheme();
  const noInline = props.metastring?.includes('noInline') ?? false;
  const folded = props.metastring?.includes('folded') ?? false;
  const zerodev = props.metastring?.includes('zerodev') ?? false;
  return (
    <div className={styles.playgroundContainer}>
      {/* @ts-expect-error: type incompatibility with refs */}
      <LiveProvider
        code={children.replace(/\n$/, '')}
        noInline={noInline}
        transformCode={transformCode ?? ((code) => `${code};`)}
        theme={prismTheme}
        {...props}>
        {playgroundPosition === 'top' ? (
          <>
            <ResultWithHeader zerodev={zerodev} />
            <EditorWithHeader folded={folded} />
          </>
        ) : (
          <>
            <EditorWithHeader folded={folded} />
            <ResultWithHeader zerodev={zerodev} />
          </>
        )}
      </LiveProvider>
    </div>
  );
}

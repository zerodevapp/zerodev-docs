// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require('path');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ZeroDev Documentation',
  tagline: 'Use ZeroDev to build powerful and easy-to-use Web3 apps with account abstraction.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.zerodev.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zerodevapp', // Usually your GitHub org/user name.
  projectName: 'zerokit-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    'docusaurus-plugin-sass',
    '@docusaurus/theme-live-codeblock',
    path.resolve(
      __dirname,
      'src/plugins/docusaurus-plugin-zerokit.js'
    ),
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/zerodevapp/zerokit-docs/edit/main/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/zerodevapp/zerokit-docs/edit/main/blog/',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.scss'),
            require.resolve('@rainbow-me/rainbowkit/styles.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: '5LJ5U6HPYS',
        apiKey: '8cc53b1147b46d953ca445842e4bee2e',
        indexName: 'zerodev',
      },
      // Replace with your project's social card
      // image: 'img/zerokit-social-card.jpg',
      navbar: {
        title: 'ZeroDev',
        logo: {
          alt: 'ZeroDev Logo',
          src: 'img/zerokit_logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Documentation',
          },
          { to: 'https://zerodev-api.readme.io/', label: 'API', position: 'left' },
          { to: 'https://dashboard.zerodev.app', label: 'Dashboard', position: 'right' },
          { to: '/blog', label: 'Blog', position: 'left' },
          // {
          //   href: 'https://github.com/zerodevapp/zerokit',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'bottom',
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;

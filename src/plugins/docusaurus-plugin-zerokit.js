const { ProvidePlugin } = require('webpack')
class ESMPolyfillWrapper {
    apply(compiler) {
      compiler.options.plugins.push(new ProvidePlugin({
        process: "process/browser.js"
      }))
  
      compiler.options.resolve.fallback = {
        ...compiler.options.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
      }
    }
}

module.exports = function () {
  return {
    name: 'docusaurus-plugin-zerokit',
    configureWebpack(_config, isServer, utils) {
        return {
            plugins: [
              new ESMPolyfillWrapper(),
            ]
        }
    }
  };
};
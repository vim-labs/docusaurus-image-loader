/**
 * This plugin inlines small (<8KB) images and copies larger media to the build folder.
 *
 * References:
 * - Docusaurus lifecycle APIs: configureWebpack https://v2.docusaurus.io/docs/lifecycle-apis/
 * - Webpack loaders: url-loader https://webpack.js.org/loaders/url-loader/
 * - Webpack loaders: file-loader https://webpack.js.org/loaders/file-loader/
 */

module.exports = () => ({
  name: "docusaurus-image-loader",
  configureWebpack: () => ({
    // Use environment to define the Webpack optimization mode.
    mode: process.env.NODE_ENV || "development",
    module: {
      rules: [
        {
          // Use this plugin on .gif, .png, .jpg, .jpeg, and .svg files.
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                // Inline image files < 8KB as base64-encoded strings using url-loader.
                limit: 8192,
                // Copy larger images into the build folder using file-loader.
                fallback: "file-loader"
              }
            }
          ]
        }
      ]
    }
  })
});

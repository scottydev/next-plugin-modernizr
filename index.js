const path = require("path");

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      const { dir } = options;

      config.module.rules.push({
        test: /\.modernizrrc(\.json)?$/,
        include: [dir],
        exclude: /node_modules/,
        use: [
          {
            loader: "webpack-modernizr-loader"
          }
        ]
      });

      config.resolve.alias.modernizr$ = path.resolve(dir, "./.modernizrrc");

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};

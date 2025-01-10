const webpack = require("webpack");
const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    stats: {
      errorDetails: true, // Enable detailed error output
      modules: true,      // Show modules in error messages
      warnings: true,     // Include warnings
      builtAt: true,      // Display build time
    },
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./static/frontend"),
      filename: "[name].js",
      clean: true, // Clean the output directory before each build
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      fallback: {
        process: require.resolve("process/browser"),
        path: require.resolve("path-browserify"),
        zlib: require.resolve("browserify-zlib"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
        assert: require.resolve("assert/"),
        crypto: require.resolve("crypto-browserify"),
        os: require.resolve("os-browserify/browser"),
        util: require.resolve("util/"),
        constants: require.resolve("constants-browserify"),
        vm: require.resolve("vm-browserify"),
        tty: require.resolve("tty-browserify"),
      },
      alias: {
        axios$: false, // Explicitly set Axios alias to false to avoid conflicts
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)$/i,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // Inline images smaller than 8KB
            },
          },
          generator: {
            filename: "images/[name][hash][ext][query]", // Emit larger files in the images directory
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][hash][ext][query]", // Emit font files in the fonts directory
          },
        },
        {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader",
            ],
          },
          {
            test: /\.(scss|sass)$/i,
            use: [
              "style-loader", 
              "css-loader", 
              "sass-loader",
            ],
          },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(argv.mode),
      }),
      ...(isProduction
        ? [
            new ImageMinimizerPlugin({
              minimizerOptions: {
                plugins: [
                  ["imagemin-mozjpeg", { quality: 75 }],
                  ["imagemin-pngquant", { quality: [0.6, 0.8] }],
                ],
              },
            }),
          ]
        : []),
    ],
    devtool: isProduction ? "source-map" : "eval-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "./static/frontend"),
      },
      compress: true,
      port: 3000,
      hot: true,
    },
  };
};
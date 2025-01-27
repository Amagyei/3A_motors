import webpack from "webpack";
import path from "path";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";

export default (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    stats: {
      errorDetails: true,
      modules: true,
      warnings: true,
      builtAt: true,
    },
    entry: "./src/index.js",
    output: {
      path: path.resolve(process.cwd(), "./static/frontend"),
      filename: "[name].js",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      mainFiles: ["index"],
      fallback: {
        process: "process/browser",
        zlib: "browserify-zlib",
        stream: "stream-browserify",
        buffer: "buffer",
        assert: "assert",
        util: "util",
        path: "path-browserify",
        crypto: "crypto-browserify",
        http: "stream-http",
        https: "https-browserify",
        os: "os-browserify/browser",
        constants: "constants-browserify",
        vm: "vm-browserify",
        tty: "tty-browserify",
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
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: "images/[name][hash][ext][query]",
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][hash][ext][query]",
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(scss|sass)$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser", // Polyfill for process
        Buffer: ["buffer", "Buffer"], // Polyfill for Buffer
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
        directory: path.join(process.cwd(), "./static/frontend"),
      },
      compress: true,
      port: 3000,
      hot: true,
    },
  };
};
module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "10",
            browsers: "last 2 versions",
          },
          useBuiltIns: "usage",
          corejs: 3,
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-runtime",
      "babel-plugin-macros",
      [
        "@babel/plugin-proposal-decorators",
        { legacy: true },
      ],
      "@babel/plugin-syntax-dynamic-import",
    ],
  };
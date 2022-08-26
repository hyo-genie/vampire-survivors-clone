const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/index.ts"),
    vendor: ["phaser"],
  },
  devtool: "inline-source-map",
  devServer: {
    host: "localhost",
    static: {
      directory: path.resolve(__dirname, "src", "assets"),
    },
    // @TODO: HMR 적용
    // hot: "only",
    // hotOnly: true,
    // contentBase: path.resolve(__dirname, "src", "assets"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: __dirname,
        configFile: path.join(__dirname, "tsconfig.json"),
      }),
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

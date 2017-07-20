var path = require("path");
var webpack = require("webpack");
var BabiliPlugin = require("babili-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
// var { keys, assign } = Object;

var isProduction = process.env.NODE_ENV === "production";
var isTest = process.env.NODE_ENV === "test";

var config = {};

config.entry = {
  main: path.resolve(__dirname, "src", "main.js")
};

config.output = {
  path: path.resolve(__dirname, "dist"),
  filename: !isProduction ? "[name].bundle.js" : "[name].bundle.[chunkhash].js",
  publicPath: "/"
};

config.devtool = !isProduction ? "cheap-eval-source-map" : "source-map";

if (!isProduction) {
  config.devServer = {
    overlay: true,
    hot: !isTest,
    historyApiFallback: true,
    publicPath: "/"
  };
}

config.module = {};
config.module.rules = [
  {
    test: /\.json$/,
    use: ["json-loader"]
  },
  {
    test: /\.(csv|tsv)$/,
    use: ["csv-loader"]
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: "css-loader"
    })
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: ["file-loader"]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ["file-loader"]
  }
];

config.plugins = [];
config.plugins.push(
  new webpack.DefinePlugin(
    Object.keys(process.env)
      .filter(key => key.toLowerCase().indexOf("wapp_") === 0)
      .reduce(
        (env, key) => Object.assign({ ["process.env." + key]: process.env[key] }, env),
        {}
      )
  )
);
config.plugins.push(
  new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development",
    allChunks: true
  })
);

if (!isTest) {
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    })
  );
}

if (!isProduction) {
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true
    })
  );
  if (!isTest) config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (isProduction) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );
  config.plugins.push(new BabiliPlugin());
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true
      }
    })
  );
}

module.exports = config;

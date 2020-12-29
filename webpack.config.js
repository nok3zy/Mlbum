const path = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "public");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ["@babel/polyfill",ENTRY_FILE],
    mode: MODE,
    devtool:"cheap-module-source-map",
    module: {
      rules: [
        {
            test:/\.(js)$/,
            use:[
                {
                    loader:'babel-loader'
                }
            ]
        },
  
        
      ]
    },
    output: {
      path: OUTPUT_DIR,
      filename: "[name].js"
    }
  };
  
  module.exports = config;
  
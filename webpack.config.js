const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const DotenvPlugin = require("webpack-dotenv-plugin");

module.exports = {
  plugins: [
    new DotenvPlugin({
      path: ".env",
      allowEmptyValues: true
    })
  ]
};

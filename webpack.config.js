const path = require("path");

module.exports = {
  mode: "development",
  entry: { index: "./build/index.js", admin: "./build/src/admin.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build2"),
  },
};

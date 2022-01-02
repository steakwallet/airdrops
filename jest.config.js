module.exports = {
  transform: {
    "\\.ts$": ["babel-jest", { configFile: "./test-babel.config.js" }],
  },
};

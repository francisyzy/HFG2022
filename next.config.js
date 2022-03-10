const path = require("path");

module.exports = {
  // https://github.com/serverless-nextjs/serverless-next.js/issues/876
  target: "experimental-serverless-trace", // For Netlify

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  publicRuntimeConfig: {
    buildTimestamp: new Date(),
  },
};

const { override } = require("customize-cra");

module.exports = override((config) => {
  // Adjust source-map-loader to ignore TSX components referencing non-existent .js maps
  config.module.rules.forEach((rule) => {
    if (rule.use) {
      rule.use.forEach((useEntry) => {
        if (
          useEntry.loader && 
          useEntry.loader.includes("source-map-loader")
        ) {
          useEntry.options = useEntry.options || {};
          useEntry.options.filterSourceMappingUrl = (url, resourcePath) => {
            // Skip filtering for Next.js modules
            if (resourcePath.includes("next/")) {
              return true;
            }
            if (resourcePath.includes("/src/components/")) {
              return false;
            }
            return true;
          };
        }
      });
    }
  });
  return config;
});

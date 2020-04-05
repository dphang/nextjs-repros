const percyHealthCheck = require('@percy/cypress/task');
const cypressTypeScriptPreprocessor = require("./cy-ts-preprocessor");

module.exports = on => {
  on("file:preprocessor", cypressTypeScriptPreprocessor);
  on("task", percyHealthCheck);
  on('task', require('@cypress/code-coverage/task'))
};

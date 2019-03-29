var _ = require("lodash");

const cognitiveServiceKey = "CognitiveServiceKey";
const blobConnectionStringKey = "BlobConnectionString";
const envModeKey = "EnvironmentMode";

function getEnvVariable(key) {
  if (_.isNil(key)) {
    throw new Error("Environment parameter key must not be null or undefiend");
  }

  if (!process.env.hasOwnProperty(key)) {
    throw new Error(`'${key}' is not set in environment.`);
  }

  return process.env[key];
}

module.exports = {
  CognitiveServiceKey: cognitiveServiceKey,
  BlobConnectionStringKey: blobConnectionStringKey,
  EnvModeKey: envModeKey,
  getEnvVar: getEnvVariable
};

const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const types = require("../db/types");
const userResolver = require("../MS1/userResolver");
const macroResolver = require("../MS2/macroResolver");

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([types]),
  resolvers: mergeResolvers([userResolver, macroResolver]),
});

module.exports = schema;

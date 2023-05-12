const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const types = require("../db/types");
const resolvers = require("./resolver");

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([types]),
  resolvers: mergeResolvers([resolvers]),
});

module.exports = schema;
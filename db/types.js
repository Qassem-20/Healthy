const { gql } = require('apollo-server-express');

const types = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    age: String
    weight: String
    weight_goal: String
    height: String
    sex: String
    activity_level: String
    macros: [Macros!]!
    createdAt: String!
    updatedAt: String!
  }

  type Macros {
    _id: ID!
    calories: Float!
    meal_type: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getUserProfile: User!
    fetchMacros: [Macros!]!
    getAllMacrosGroupedByDate: [MacrosByDate!]!
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!, age: String, weight: String, weight_goal: String, height: String, sex: String, activity_level: String): User!
    loginUser(email: String!, password: String!): String!
    logoutUser: String!
    addMacros(calories: Float!, meal_type: String!, date: String): Macros!
    deleteMacro(id: ID!): String!
    updateUser(id: ID!, name: String, age: String, weight: String, weight_goal: String, height: String, sex: String, activity_level: String): User!
  }

  type MacrosByDate {
    date: String!
    totalCalories: Float!
    macros: [Macros!]!
  }
`;

module.exports = types;
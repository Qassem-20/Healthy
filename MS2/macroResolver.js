const User = require("../db/models/User");
const Macros = require("../db/models/Macros");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    fetchMacros: async (_, __, { req }) => {
      try {
        const macros = await Macros.find();
        return macros;
      } catch (err) {
        throw new Error("Error fetching macros");
      }
    },
    getAllMacrosGroupedByDate: async (_, __, { req }) => {
      try {
        const userId = req.user._id;
        const macros = await Macros.aggregate([
          {
            $match: { user: userId },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              macros: {
                $push: {
                  _id: "$_id",
                  calories: "$calories",
                  meal_type: "$meal_type",
                  createdAt: "$createdAt",
                },
              },
              totalCalories: { $sum: "$calories" },
            },
          },
          {
            $sort: {
              _id: -1,
            },
          },
        ]);
        return macros;
      } catch (err) {
        console.error(err);
        throw new Error("Error fetching macros");
      }
    },
  },
  Mutation: {
    addMacros: async (_, args, { req }) => {
      try {
        const { calories, meal_type, date } = args;
        const macro = await Macros.create({
          calories,
          meal_type,
          date,
          user: req.user._id,
        });
        return { message: "Macro added successfully" };
      } catch (err) {
        console.log(err);
        throw new Error("Error adding macro");
      }
    },
    deleteMacro: async (_, { id }) => {
      try {
        await Macros.findByIdAndDelete(id);
        return { message: "Macro deleted successfully" };
      } catch (err) {
        console.log(err);
        throw new Error("Error deleting macro");
      }
    },
  },
};

module.exports = resolvers;

const Macros = require("../db/models/Macros.js");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLID,
} = require("graphql");

const fetchMacros = async (req, res) => {
  try {
    const macros = await Macros.find({ user: req.user._id });
    res.json({ macros });
  } catch (err) {
    return res.sendStatus(400);
  }
};
const getAllMacrosGroupedByDate = async (req, res) => {
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
    res.json(macros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const addMacros = async (req, res) => {
  try {
    const { calories, meal_type, date } = req.body;

    const macro = await Macros.create({
      calories,
      meal_type,
      date,
      user: req.user._id,
    });

    res.json({ macro });
  } catch (err) {
    return res.sendStatus(400);
  }
};

const deleteMacro = async (req, res) => {
  try {
    const macrosId = req.params.id;

    await Macros.findByIdAndDelete(macrosId);

    res.json({ success: "Record deleted" });
  } catch (err) {
    return res.sendStatus(400);
  }
};

//graphQL still not tested
const MacroType = new GraphQLObjectType({
  name: "Macro",
  fields: () => ({
    _id: { type: GraphQLID },
    calories: { type: GraphQLInt },
    meal_type: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

const MacrosGroupedByDateType = new GraphQLObjectType({
  name: "MacrosGroupedByDate",
  fields: () => ({
    date: { type: GraphQLString },
    macros: { type: new GraphQLList(MacroType) },
    totalCalories: { type: GraphQLInt },
  }),
});

const MacrosInputType = new GraphQLInputObjectType({
  name: "MacrosInput",
  fields: () => ({
    calories: { type: new GraphQLNonNull(GraphQLInt) },
    meal_type: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    fetchMacros: {
      type: new GraphQLList(MacroType),
      resolve: async (parent, args, { user }) => {
        try {
          const macros = await Macros.find({ user });
          return macros;
        } catch (err) {
          console.error(err);
          throw new Error("Internal server error");
        }
      },
    },
    getAllMacrosGroupedByDate: {
      type: new GraphQLList(MacrosGroupedByDateType),
      resolve: async (parent, args, { user }) => {
        try {
          const macros = await Macros.aggregate([
            { $match: { user } },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
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
            { $sort: { _id: -1 } },
          ]);
          return macros;
        } catch (err) {
          console.error(err);
          throw new Error("Internal server error");
        }
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMacros: {
      type: MacroType,
      args: { input: { type: new GraphQLNonNull(MacrosInputType) } },
      resolve: async (parent, { input }, { user }) => {
        try {
          const { calories, meal_type, date } = input;
          const macro = await Macros.create({ calories, meal_type, date, user });
          return macro;
        } catch (err) {
          console.error(err);
          throw new Error("Internal server error");
        }
      },
    },
    deleteMacro: {
      type: MacroType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, { id }, { user }) => {
        try {
          const macro = await Macros.findOneAndDelete({ _id: id, user });
          return macro;
        } catch (err) {
          console.error(err);
          throw new Error("Internal server error");
        }
      },
    },
  },
});


module.exports = {
  fetchMacros,
  getAllMacrosGroupedByDate,
  addMacros,
  deleteMacro,
  RootQueryType,
  MutationType,
};

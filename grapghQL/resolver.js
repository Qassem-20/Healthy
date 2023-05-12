const User = require("../db/models/User");
const Macros = require("../db/models/Macros");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    getUserProfile: async (_, __, { req }) => {
      try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        console.log(err);
        throw new Error("Error registering user");
      }
    },
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
    registerUser: async (_, args) => {
      try {
        const {
          name,
          email,
          password,
          age,
          weight,
          weight_goal,
          height,
          sex,
          activity_level,
        } = args;

        //hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        await User.create({
          name,
          email,
          password: hashedPassword,
          age,
          weight,
          weight_goal,
          height,
          sex,
          activity_level,
        });

        return { message: "User registered successfully" };
      } catch (err) {
        console.log(err);
        throw new Error("Error registering user");
      }
    },
    loginUser: async (_, { email, password }, { res }) => {
      try {
        // Find the user with requested email
        const user = await User.findOne({ email });

        //if user isn't exist on DB
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Compare sent in password with found user password hash
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        // token is valid for 14 days
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 14;

        // create a jwt token
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

        // Set the cookie
        res.cookie("AuthorizationUser", token, {
          expires: new Date(exp),
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        return { message: "User authenticated successfully" };
      } catch (err) {
        console.log(err);
        throw new Error("Error authenticating user");
      }
    },
    logoutUser: async (_, __, { res }) => {
      try {
        res.cookie("AuthorizationUser", "", { expires: new Date() });
        return { message: "User logged out successfully" };
      } catch (err) {
        console.log(err);
        throw new Error("Error logging out user");
      }
    },
    updateUser: async (_, args, { req }) => {
      try {
        const userId = req.user.id;
        const { name, age, weight, weight_goal, height, sex, activity_level } =
          args;

        await User.findByIdAndUpdate(userId, {
          name,
          age,
          weight,
          weight_goal,
          height,
          sex,
          activity_level,
        });

        const user = await User.findById(userId);

        return user;
      } catch (err) {
        console.log(err);
        throw new Error("Error updating user");
      }
    },
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

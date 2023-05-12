const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide a name"],
      minlength: 3,
      maxlength: 45,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
      lowercase: true,
      index: true,
    },
    age: {
      type: String,
      required: [false, "Please enter age"],
      maxlength: 4,
      default: "",
    },
    weight: {
      type: String,
      required: [false, "Please enter weight"],
      maxlength: 4,
      default: "",
    },
    weight_goal: {
      type: String,
      required: [false, "Please enter weight goal"],
      maxlength: 4,
      default: "",
    },
    height: {
      type: String,
      required: [false, "Please enter height"],
      maxlength: 4,
      default: "",
    },
    sex: {
      type: String,
      required: [false, "Please enter Sex"],
      enum: ["", "male", "female"],
      default: "",
    },
    activity_level: {
      type: String,
      required: [false, "Please enter your nationality"],
      enum: [
        "",
        "sedentary",
        "lightlyActive",
        "moderatelyActive",
        "veryActive",
        "superActive",
      ],
      default: "",
    },
    macros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Macros" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");

const macrosSchema = new mongoose.Schema(
  {
    calories: {
      type: Number,
      required: [true, "Please enter your calories"],
      maxlength: 20,
    },
    meal_type: {
      type: String,
      required: false,
      trim: true,
      maxlength: 20,
      default: "",
    },
    date: {
      type: String,
      required: [false, "Please enter the date"],
      maxlength: 30,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Macros = mongoose.model("Macros", macrosSchema);

module.exports = Macros;

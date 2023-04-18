const Macros = require("../models/Macros.js");

const fetchMacros = async (req, res) => {
  try {
    const macros = await Macros.find({ user: req.user._id });
    res.json({ macros });
  } catch (err) {
    return res.sendStatus(400);
  }
};
const fetchMacrosByDate = async (req, res) => {
  try {
    const macros = await Macro.findAll({
      attributes: [
        "createdAt",
        "meal_type",
        [sequelize.fn("sum", sequelize.col("calories")), "total_calories"],
      ],
      group: [sequelize.fn("DATE", sequelize.col("createdAt")), "meal_type"],
      order: [["createdAt", "ASC"]],
    });

    if (macros.length === 0) {
      return res.status(404).json({ message: "No macros found" });
    }

    res.status(200).json(macros);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching macros" });
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

const updateMacro = async (req, res) => {
  try {
    const macrosId = req.params.id;

    const { calories, meal_type, date } = req.body;

    await Macros.findOneAndUpdate(
      { _id: macrosId, user: req.user._id },
      {
        calories,
        meal_type,
        date,
      }
    );
    const macros = await Macros.findById(macrosId);

    res.json({ macros });
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

module.exports = {
  fetchMacros,
  fetchMacrosByDate,
  addMacros,
  updateMacro,
  deleteMacro,
};

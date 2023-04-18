const Macros = require("../models/Macros.js");

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
    const macros = await Macros.aggregate([
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
  getAllMacrosGroupedByDate,
  addMacros,
  updateMacro,
  deleteMacro,
};

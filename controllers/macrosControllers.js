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
    const macros = await Macros.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          meal_type: "$meal_type",
          total_calories: { $sum: "$calories" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

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

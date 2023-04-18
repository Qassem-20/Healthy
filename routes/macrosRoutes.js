const express = require("express");
const router = express.Router();

//middleware
const requireAuth = require("../middleWares/requireAuth.js");
//exports from the controller
const {
  fetchMacros,
  fetchMacrosByDate,
  addMacros,
  updateMacro,
  deleteMacro,
} = require("../controllers/macrosControllers.js");
// (get) All macros
router.route("/macros").get(fetchMacros);

//(get) All macros sorted by date
router.route("/macrosDate").get(fetchMacrosByDate);

// (Post) add macro
router.route("/macros/addMacros").post(requireAuth, addMacros);

// (PUT) update macro
router.route("/macros/:id").put(requireAuth, updateMacro);

// (DELETE) delete macro
router.route("/macros/:id").delete(requireAuth, deleteMacro);

module.exports = router;

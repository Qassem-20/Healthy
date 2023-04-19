import { create } from "zustand";
import axios from "axios";

const MacroStore = create((set) => ({
  macros: null,
  macro: null,
  fetchMacros: async () => {
    // Fetch the macros
    const res = await axios.get("http://localhost:4000/api/v1/macrosDate", {
      withCredentials: true,
    });
    // Set to state
    set({ macros: res.data });
  },

  deleteMacro: async (_id) => {
    await axios.delete("http://localhost:4000/api/v1/macros/" + _id, {
      withCredentials: true,
    });
    //update page;
    window.location.reload();
  },

  updateStatue: {
    _id: null,
    meal_type: "",
    calories: "",
  },
  toggleUpdate: ({ _id, meal_type, calories }) => {
    set({
      updateStatue: {
        meal_type,
        calories,
        _id,
      },
    });
  },
  updateMacro: async () => {
    const {
      updateStatue: { meal_type, calories, _id },
    } = MacroStore.getState();

    // Send the update request
    await axios.put(
      `http://localhost:4000/api/v1/macros/${_id}`,
      {
        meal_type,
        calories,
      },
      { withCredentials: true }
    );

    set({
      updateStatue: {
        _id: null,
        meal_type: "",
        calories: "",
      },
    });
  },

  values: {
    meal_type: "",
    calories: "",
  },

  addMacro: async () => {
    const { values } = MacroStore.getState();

    // add macro
    await axios.post("http://localhost:4000/api/v1/macros/addMacros", values, {
      withCredentials: true,
    });
    set({
      values: {
        meal_type: "",
        calories: "",
      },
    });
  },
  application: {
    application: "",
  },
  handleUpdate: async (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        updateStatue: {
          ...state.updateStatue,
          [name]: value,
        },
      };
    });
  },
  handleChange: async (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        values: {
          ...state.values,
          [name]: value,
        },
      };
    });
  },
}));

export default MacroStore;

import { create } from "zustand";
import axios from "axios";

const UserStore = create((set) => ({
  users: null,
  user: null,

  fetchUserProfile: async () => {
    try {
      const response = await axios.get("/api/v1/userProfile", {
        withCredentials: true,
      });
      set({ user: response.data.user });
    } catch (error) {
      console.error(error);
    }
  },

  updateProfile: {
    _id: null,
    name: "",
    phone: "",
    nationality: "",
    university: "",
    major: "",
    gpa: "",
    concentrated_major: "",
    skills: "",
    cv: "",
    linkedIn_profile: "",
    experience: "",
  },
  toggleUpdate: ({
    _id,
    name,
    age,
    weight,
    weight_goal,
    height,
    sex,
    activity_level,
  }) => {
    set({
      updateProfile: {
        name,
        age,
        weight,
        weight_goal,
        height,
        sex,
        activity_level,
        _id,
      },
    });
  },
  updateUser: async () => {
    const {
      updateProfile: {
        _id,
        name,
        age,
        weight,
        weight_goal,
        height,
        sex,
        activity_level,
      },
    } = UserStore.getState();

    // Send the update request
    await axios.put(
      `/api/v1/users/${_id}`,
      {
        name,
        age,
        weight,
        weight_goal,
        height,
        sex,
        activity_level,
      },
      { withCredentials: true }
    );

    set({
      updateProfile: {
        _id: null,
        name: "",
        age: "",
        weight: "",
        weight_goal: "",
        height: "",
        sex: "",
        activity_level: "",
      },
    });
  },

  values: {
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    weight_goal: "",
    height: "",
    sex: "",
    activity_level: "",
  },

  registerUser: async () => {
    const { values } = UserStore.getState();

    // register User
    await axios.post("/api/v1/registerUser", values, {
      withCredentials: true,
    });
    set({
      values: {
        name: "",
        email: "",
        password: "",
        age: "",
        weight: "",
        weight_goal: "",
        height: "",
        sex: "",
        activity_level: "",
      },
    });
  },

  handleUpdate: async (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        updateProfile: {
          ...state.updateProfile,
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

  // login
  loggedIn: null,
  loginFormUser: {
    email: "",
    password: "",
  },
  handleChangeLogin: async (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginFormUser: {
          ...state.loginFormUser,
          [name]: value,
        },
      };
    });
  },
  loginUser: async () => {
    const { loginFormUser } = UserStore.getState();

    await axios.post("/api/v1/loginUser", loginFormUser,{
      withCredentials: true,
    });

    set({ loggedIn: true });
  },
  checkAuth: async () => {
    try {
      await axios.get("/api/v1/checkAuthUser", {
        withCredentials: true,
      });
      set({ loggedIn: true });
    } catch (err) {
      set({ loggedIn: false });
    }
  },
  logout: async () => {
    await axios.get("/api/v1/logutConsuemr", {
      withCredentials: true,
    });
    set({ loggedIn: false });
  },
}));

export default UserStore;

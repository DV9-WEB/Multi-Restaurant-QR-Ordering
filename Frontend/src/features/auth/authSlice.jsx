import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:5000/api/auth";

export const register = createAsyncThunk(
  "/register",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      return res.data;
      console.log(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
      console.log(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk("/login", async (userData, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// 🔺 Async action to update profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.put(`${API_URL}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser, // ✅
    isLoading: false,
    error: null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;

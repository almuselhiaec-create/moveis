import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
  `${process.env.REACT_APP_API_URL}/loginUser`,
  {
    email,
    password,
  }
);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, address, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
  `${process.env.REACT_APP_API_URL}/registerUser`,
  {
    name,
    email,
    address,
    password,
    role,
  }
);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

// Buy movies
export const buyMovies = createAsyncThunk(
  "user/buyMovies",
  async ({ movieIds }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
  `${process.env.REACT_APP_API_URL}/buyMovies`,
  {
    movieIds,
  }
);
      return response.data; // { movies, totalPrice, msg }
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    purchase: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.purchase = null;
      localStorage.removeItem("user"); // ADDED
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Buy Movie
      .addCase(buyMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.purchase = action.payload;
      })
      .addCase(buyMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

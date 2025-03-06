import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchCoins = createAsyncThunk("crypto/fetchCoins", async () => {
  const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
    params: {
      vs_currency: "EUR",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
    },
  });
  return response.data;
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: { coins: [], favorites: [], loading: false, error: "" },
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    reorderCoins: (state, action) => {
      state.coins = action.payload; // Properly updates coin order in Redux state
    },
    toggleFavorite: (state, action) => {
      const coinId = action.payload;
      if (state.favorites.includes(coinId)) {
        state.favorites = state.favorites.filter((id) => id !== coinId);
      } else {
        state.favorites.push(coinId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch data";
      });
  },
});

export const { setCoins, reorderCoins, toggleFavorite } = cryptoSlice.actions;
export default cryptoSlice.reducer;

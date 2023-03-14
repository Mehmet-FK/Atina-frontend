import { createSlice } from "@reduxjs/toolkit";

const atinaSlice = createSlice({
  name: "atina",

  initialState: {
    atinaUsers: [],
    mobileBookings: [],
    nfcTags: [],
    loading: false,
    error: false,
    // TODO: Add other Slices i.e. "mobileBookings"
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      if (url.toLowerCase().includes("mobile")) {
        state.mobileBookings = data;
      } else if (url.toLowerCase().includes("nfc")) {
        state.nfcTags = data;
      } else if (url.toLowerCase().includes("users")) {
        state.atinaUsers = data;
      }
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail } = atinaSlice.actions;
export default atinaSlice.reducer;

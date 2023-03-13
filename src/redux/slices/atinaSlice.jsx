import { createSlice } from "@reduxjs/toolkit";

const atinaSlice = createSlice({
  name: "atina",

  initialState: {
    AtinaUsers: [],
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
      state[url] = data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail } = atinaSlice.actions;
export default atinaSlice.reducer;

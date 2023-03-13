import { configureStore } from "@reduxjs/toolkit";
import atinaReducer from "..//slices/atinaSlice";

const store = configureStore({
  reducer: {
    atina: atinaReducer,
  },
});

export default store;

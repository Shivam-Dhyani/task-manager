import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../types";

const usersInitialState = {
  user: {
    data: null,
    isLoading: false,
    errors: "",
  },
};

export const usersSlice = createSlice({
  name: USERS,
  initialState: usersInitialState,
  reducers: {
    /* This action will trigger our saga middleware
       and set the loader to true and reset error message.
    */
    getUserAction: (state, { payload: id }) => {
      console.log("Hello1");
      state.user.isLoading = true;
      state.user.errors = "";
    },
    getUserSuccessAction: (state, { payload: user }) => {
      console.log("Hello2");

      state.user.isLoading = false;
      state.user.data = user;
    },
    getUserErrorAction: (state, { payload: error }) => {
      console.log("Hello3");

      state.user.isLoading = false;
      state.user.errors = error;
    },
  },
});

/* getUserSuccessAction and getUserErrorAction will be used inside the saga
  middleware. Only getUserAction will be used in a React component.
*/

export const { getUserAction, getUserSuccessAction, getUserErrorAction } =
  usersSlice.actions;

export default usersSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for your state and payloads
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserState {
  logedInuser: User | null;
}

// Define the initial state with the appropriate types
const initialState: UserState = {
  logedInuser: null,
};

const userSlice = createSlice({
  name: "generl",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<User>) => {
      state.logedInuser = action.payload;
    },
  },
});

// Export actions and reducer
export const { setLoggedInUser } = userSlice.actions;
export default userSlice.reducer;

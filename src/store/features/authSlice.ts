import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
  name?: string;
  picture?: string;
  role: "retailer" | "wholeseller" | "admin" | null; // RBAC
};

interface AuthState {
  isAuthenticated: boolean;
  isRegistered: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isRegistered: false,
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (
      state,
      action: PayloadAction<{
        email: string;
        role: "retailer" | "wholeseller";
      }>,
    ) => {
      // Register the user but don't log them in
      state.isRegistered = true;
      state.user = {
        email: action.payload.email,
        role: action.payload.role,
      };
    },

    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.isRegistered = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;

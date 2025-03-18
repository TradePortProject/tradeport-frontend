import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
  name?: string;
  picture?: string;
  role?: "retailer" | "wholesaler" | "admin" | null;
  phoneNo?: string;
  address?: string;
  remarks?: string;
  isActive?: boolean;
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
    setUserDetails: (
      state,
      action: PayloadAction<{ email: string; name?: string; picture?: string }>,
    ) => {
      // Store user details but DON'T authenticate or authorize
      state.user = {
        ...state.user, // Preserve existing role if already set
        email: action.payload.email,
        name: action.payload.name,
        picture: action.payload.picture,
      };
    },

    register: (
      state,
      action: PayloadAction<{
        email: string;
        role: "retailer" | "wholesaler";
      }>,
    ) => {
      // Store user details but don't log them in
      state.isRegistered = true;
      state.user = {
        ...state.user, // Preserve existing details (email, name, picture)
        email: action.payload.email,
        role: action.payload.role,
      };
    },

    login: (
      state,
      action: PayloadAction<{
        token: string;
        user: {
          loginID: string;
          userName: string;
          role: number;
          phoneNo?: string;
          address?: string;
          remarks?: string;
          isActive?: boolean;
        };
      }>, // Accepts any API response format
    ) => {
      const apiUser = action.payload.user;

      // Convert API response to match Redux state format
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = {
        email: apiUser.loginID, // Map `loginID` → `email`
        name: apiUser.userName, // Map `userName` → `name`
        role:
          apiUser.role === 0
            ? "retailer"
            : apiUser.role === 1
              ? "wholesaler"
              : "admin", // Convert role number to string
        phoneNo: apiUser.phoneNo,
        address: apiUser.address,
        remarks: apiUser.remarks,
        isActive: apiUser.isActive,
      };
    },

    logout: (state) => {
      // Clear all authentication state
      state.isAuthenticated = false;
      state.isRegistered = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUserDetails, register, login, logout } = authSlice.actions;
export default authSlice.reducer;

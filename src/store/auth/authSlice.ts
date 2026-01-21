// import { User } from "@/src/types";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import * as SecureStore from 'expo-secure-store';


// type AuthState = {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     error: string | null;
// }

// const initialState: AuthState = {
//     user: null,
//     token: null,
//     loading: false,
//     error: null
// };

// export const login = createAsyncThunk(
//     'auth/login',
//     async (
//         creadentials: { username: string; password: string },
//         { rejectWithValue }
//     ) => {
//         try {
//             const res = await axios.post(
//                 'https://your-api-url.com/auth/login',
//                 creadentials
//             );

//             await SecureStore.setItemAsync('token', res.data.token);

//             return {
//                 user: res.data.user,
//                 token: res.data.token,
//             };
//         } catch ( err: any ) {
//             return rejectWithValue(err.response.data.message || 'Login failed');
//         }
//     }
// );

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         logout(state) {
//             state.user = null;
//             state.token = null;
//             SecureStore.deleteItemAsync('token');
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(login.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload.user;
//                 state.token = action.payload.token;
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { bootstrapThunk, loginThunk, logoutThunk, registerThunk } from './auth.thunks';

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;

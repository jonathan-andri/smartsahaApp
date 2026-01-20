import { configureStore } from '@reduxjs/toolkit';
import authReduceer from './slices/authSlice';
import parcelReducer from './slices/parcelSlice';

export const store = configureStore({
    reducer: {
        auth: authReduceer,
        parcels: parcelReducer,
    },
});

// types for typescript 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { Parcel } from "@/src/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from '../../api/client';

type ParcelState = {
    list: Parcel[];
    loading: boolean;
};

const initialState: ParcelState = {
    list: [],
    loading: false,
}

export const fetchParcels = createAsyncThunk(
    'parcels/fetch',
    async () => {
      const res = await api.get('/parcels/');
      return res.data;
    }
  );
  
  const parcelSlice = createSlice({
    name: 'parcels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchParcels.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchParcels.fulfilled, (state, action) => {
          state.loading = false;
          state.list = action.payload;
        })
        .addCase(fetchParcels.rejected, (state) => {
          state.loading = false;
        });
    },
  });
  
  export default parcelSlice.reducer;
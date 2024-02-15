import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PclData, UpdateBlockRequest } from '../types/api/block';

// ==============================|| states ||============================== //

const initialState: UpdateBlockRequest = {
  id: null,
  body: {
    series: null,
    comform: {
      NOTE: null,
      pcl_datas: []
    }
  }
};

// ==============================|| slice ||============================== //
export const blockUpdateValueSlice = createSlice({
  name: 'blockUpdateValueSlice',
  initialState,
  reducers: {
    setBlockUpdateId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setBlockUpdateName: (state, action: PayloadAction<string>) => {
      state.body.series = action.payload;
    },
    setBlockUpdateDescription: (state, action: PayloadAction<string>) => {
      state.body.comform.NOTE = action.payload;
    },
    setBlockUpdatePclData: (state, action: PayloadAction<PclData[]>) => {
      state.body.comform.pcl_datas = action.payload;
    }
  }
});

export const {
  setBlockUpdateId,
  setBlockUpdateDescription,
  setBlockUpdateName,
  setBlockUpdatePclData
} = blockUpdateValueSlice.actions;

export const blockUpdateValueReducer = blockUpdateValueSlice.reducer;

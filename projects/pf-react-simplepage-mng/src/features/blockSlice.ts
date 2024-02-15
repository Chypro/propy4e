import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DisplayMode } from '../types/app/common';
import { Block } from '../types/app/block';

// ==============================|| states ||============================== //
type BlockSliceState = {
  blockDisplayMode: DisplayMode;
  skuDisplayMode: DisplayMode;
  currentPage: number;
  pageSize: number;
  total: number;
  blockBlockList: Block[];
  selectedRowKeys: React.Key[];
};

const initialState: BlockSliceState = {
  blockDisplayMode: 'table',
  skuDisplayMode: 'table',
  currentPage: 1,
  pageSize: 10,
  total: 0,
  blockBlockList: [],
  selectedRowKeys: []
};

// ==============================|| slice ||============================== //
export const blockSlice = createSlice({
  name: 'blockSlice',
  initialState,
  reducers: {
    setBlockDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
      state.blockDisplayMode = action.payload;
    },
    setSkuDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
      state.skuDisplayMode = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setBlockBlockList: (state, action: PayloadAction<Block[]>) => {
      state.blockBlockList = action.payload;
    },
    setSelectedRowKeys: (state, action: PayloadAction<React.Key[]>) => {
      state.selectedRowKeys = action.payload;
    }
  }
});

export const {
  setBlockDisplayMode,
  setSkuDisplayMode,
  setTotal,
  setCurrentPage,
  setPageSize,
  setBlockBlockList,
  setSelectedRowKeys
} = blockSlice.actions;

export const blockReducer = blockSlice.reducer;

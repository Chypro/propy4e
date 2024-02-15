import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DisplayMode } from '../types/app/common';
import { Block } from '../types/app/block';
import { Category } from '../types/app/categories';

// ==============================|| states ||============================== //
type SiteSliceState = {
  siteDisplayMode: DisplayMode;
  currentPage: number;
  pageSize: number;
  total: number;
  siteBlockList: Block[];
  selectedRowKeys: React.Key[];
  selectedBlockID: string;
  category: Category[];
};

const initialState: SiteSliceState = {
  siteDisplayMode: 'table',
  currentPage: 1,
  pageSize: 10,
  total: 0,
  siteBlockList: [],
  selectedRowKeys: [],
  selectedBlockID: '',
  category: []
};

// ==============================|| slice ||============================== //
export const siteSlice = createSlice({
  name: 'siteSlice',
  initialState,
  reducers: {
    setSiteDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
      state.siteDisplayMode = action.payload;
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
    setSiteBlockList: (state, action: PayloadAction<Block[]>) => {
      state.siteBlockList = action.payload;
    },
    setSelectedRowKeys: (state, action: PayloadAction<React.Key[]>) => {
      state.selectedRowKeys = action.payload;
    },
    setSelectedBlockID: (state, action: PayloadAction<string>) => {
      state.selectedBlockID = action.payload;
    },
    setCategory: (state, action: PayloadAction<Category[]>) => {
      state.category = action.payload;
    }
  }
});

export const {
  setSiteDisplayMode,
  setCurrentPage,
  setPageSize,
  setTotal,
  setSiteBlockList,
  setSelectedRowKeys,
  setSelectedBlockID,
  setCategory
} = siteSlice.actions;

export const siteReducer = siteSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BlockDetail, SkuList } from '../types/app/block';
import { DisplayMode } from '../types/app/common';
import { Category } from '../types/app/categories';

// ==============================|| states ||============================== //
type BlockDetailSliceState = {
  blockDetail: BlockDetail;
  selectedRowKeys: React.Key[];
  currentPage: number;
  pageSize: number;
  total: number;
  skuDisplayMode: DisplayMode;
  skuList: SkuList[];
};

const initialState: BlockDetailSliceState = {
  blockDetail: null,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  selectedRowKeys: [],
  skuDisplayMode: 'table',
  skuList: []
};
type UpdateAttribute = {
  index: number;
  value: string;
};

// ==============================|| slice ||============================== //
export const blockDetailSlice = createSlice({
  name: 'blockDetailSlice',
  initialState,
  reducers: {
    setBlockDetail: (state, action: PayloadAction<BlockDetail>) => {
      state.blockDetail = action.payload;
    },
    setSelectedRowKeys: (state, action: PayloadAction<React.Key[]>) => {
      state.selectedRowKeys = action.payload;
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
    setSkuList: (state, action: PayloadAction<SkuList[]>) => {
      state.skuList = action.payload;
    },
    updateAttribute: (state, action: PayloadAction<UpdateAttribute>) => {
      state.blockDetail.attributes[action.payload.index].value = action.payload.value;
    }
  }
});

export const {
  setBlockDetail,
  setSelectedRowKeys,
  setSkuDisplayMode,
  setCurrentPage,
  setPageSize,
  setTotal,
  setSkuList,
  updateAttribute
} = blockDetailSlice.actions;

export const blockDetailReducer = blockDetailSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PclData, UpdateBlockRequest } from '../types/api/block';
import { Block } from '../types/app/block';

// ==============================|| states ||============================== //

type Props = {
  isLoading: boolean;
  SearchedBlockList: Block[];
  searchTerm: string;
};
const initialState: Props = {
  isLoading: false,
  SearchedBlockList: [],
  searchTerm: null
};

// ==============================|| slice ||============================== //
export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchedBlockList: (state, action: PayloadAction<Block[]>) => {
      state.SearchedBlockList = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    }
  }
});

export const { setSearchedBlockList, setIsLoading, setSearchTerm } = searchSlice.actions;

export const searchSliceReducer = searchSlice.reducer;

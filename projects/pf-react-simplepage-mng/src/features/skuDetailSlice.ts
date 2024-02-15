import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Sku } from '../types/app/sku';

// ==============================|| states ||============================== //
type SkuDetailSliceState = {
  skuDetail: Sku;
};

const initialState: SkuDetailSliceState = {
  skuDetail: null
};

type UpdateAttribute = {
  index: number;
  value: string;
};

// ==============================|| slice ||============================== //
export const skuDetailSlice = createSlice({
  name: 'skuDetailSlice',
  initialState,
  reducers: {
    setSkuDetail: (state, action: PayloadAction<Sku>) => {
      state.skuDetail = action.payload;
    },
    updateAttribute: (state, action: PayloadAction<UpdateAttribute>) => {
      state.skuDetail.attributes[action.payload.index].value = action.payload.value;
    }
  }
});

export const { setSkuDetail, updateAttribute } = skuDetailSlice.actions;

export const skuDetailReducer = skuDetailSlice.reducer;

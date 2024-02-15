import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeColor, colorType, colors } from '../utils/color';

// ==============================|| states ||============================== //
type ThemeSliceState = {
  isDarkMode: boolean;
  themeColor: ThemeColor;
  primaryColor: keyof ThemeColor;
};

const initialState: ThemeSliceState = {
  isDarkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
  themeColor:
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? colors.dark
      : colors.light,
  primaryColor: colorType.blue as keyof ThemeColor
};

// ==============================|| slice ||============================== //
export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;

      state.themeColor = action.payload ? colors.dark : colors.light;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      const colorKeys = Object.keys(colorType);
      if (colorKeys.find((key) => key === action.payload)) {
        state.primaryColor = action.payload as keyof ThemeColor;
      }
    }
  }
});

export const { setIsDarkMode, setPrimaryColor } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;

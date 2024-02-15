import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// ==============================|| states ||============================== //
type AppSliceState = {
  isSidebarOpen: boolean;
  isWorkspaceSidebarOpen: boolean;
  forceRedirectLocation: string;
  selectedWorkspaceDomain: string;
  screenSize: { x: number; y: number };
  selectedSiteID: string;
  selectedBlockDetailID: string;
};

const initialState: AppSliceState = {
  isSidebarOpen: true,
  isWorkspaceSidebarOpen: true,
  forceRedirectLocation: '',
  selectedWorkspaceDomain: '',
  screenSize: { x: window.innerWidth, y: window.innerHeight },
  selectedSiteID: '',
  selectedBlockDetailID: ''
};

// ==============================|| slice ||============================== //
export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setIsWorkspaceSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isWorkspaceSidebarOpen = action.payload;
    },
    setForceRedirectLocation: (state, action: PayloadAction<string>) => {
      state.forceRedirectLocation = action.payload;
    },
    setSelectedWorkspaceDomain: (state, action: PayloadAction<string>) => {
      state.selectedWorkspaceDomain = action.payload;
    },
    setScreenSize: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.screenSize = action.payload;
    },
    setSelectedSiteID: (state, action: PayloadAction<string>) => {
      state.selectedSiteID = action.payload;
    },
    setSelectedBlockDetailID: (state, action: PayloadAction<string>) => {
      state.selectedBlockDetailID = action.payload;
    }
  }
});

export const {
  setIsSidebarOpen,
  setForceRedirectLocation,
  setIsWorkspaceSidebarOpen,
  setSelectedWorkspaceDomain,
  setScreenSize,
  setSelectedSiteID,
  setSelectedBlockDetailID
} = appSlice.actions;

export const appReducer = appSlice.reducer;

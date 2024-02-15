import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Workspace } from '../types/app/workspace';
import { GetWorkspaceListResponse } from '../types/api/workspace';

// ==============================|| states ||============================== //
type WorkspaceSliceState = {
  workspaceList: Workspace[];
  workspaceListResponse: GetWorkspaceListResponse | undefined;
  selectedWorkspaceID: string;
};

const initialState: WorkspaceSliceState = {
  workspaceList: [],
  workspaceListResponse: undefined, // do not use this state to render any ui or use it
  selectedWorkspaceID: ''
};

// ==============================|| slice ||============================== //
export const workspaceSlice = createSlice({
  name: 'workspaceSlice',
  initialState,
  reducers: {
    emptyWorkspaceList: (state) => {
      state.workspaceList = [];
    },
    addWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.workspaceList = [...state.workspaceList, action.payload];
    },
    setWorkspaceListResponse: (state, action: PayloadAction<GetWorkspaceListResponse>) => {
      state.workspaceListResponse = action.payload;
    }
  }
});

export const { emptyWorkspaceList, addWorkspace, setWorkspaceListResponse } =
  workspaceSlice.actions;

export const workspaceReducer = workspaceSlice.reducer;

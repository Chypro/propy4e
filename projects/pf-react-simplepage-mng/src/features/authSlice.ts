import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { JWT, User } from '../types/app/auth';

// ==============================|| state ||============================== //
type AuthSliceState = {
  isAuth: boolean;
  jwt: JWT;
  user: User;
  email: string;
};

const initialState: AuthSliceState = {
  isAuth: true,
  jwt: {
    refreshToken: '',
    token: ''
  },
  user: {
    uuid: '',
    userID: '',
    firstName: '',
    lastName: '',
    isSuper: false
  },
  email: ''
};

// ==============================|| slice ||============================== //
export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      console.log('set user auth');
      state.isAuth = action.payload;
    },
    setJWT: (state, action: PayloadAction<JWT>) => {
      state.jwt = action.payload;
    },
    loggedOut: (state) => {
      // logout
      console.log('authSlice execute logout');
      state.isAuth = false;
      state.jwt = {
        refreshToken: '',
        token: ''
      };
      console.log('state :>> ', state.isAuth);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    }
  }
});

export const { setAuth, loggedOut, setUser, setEmail, setJWT } = authSlice.actions;

export const authReducer = authSlice.reducer;

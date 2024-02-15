import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// slice reducers
import { themeReducer } from '../features/themeSlice';
import { appReducer } from '../features/appSlice';
import { authReducer } from '../features/authSlice';
import { workspaceReducer } from '../features/workspaceSlice';
import { blockReducer } from '../features/blockSlice';
import { siteReducer } from '../features/siteSlice';
import { blockDetailReducer } from '../features/blockDetailSlice';
import { blockUpdateValueReducer } from '../features/blockUpdateValueSlice';
import { skuDetailReducer } from '../features/skuDetailSlice';
import { searchSliceReducer } from '../features/searchSlice';

// services reducers
import { authApi } from '../services/authApi';
import { workspaceApi } from '../services/workspaceApi';

import { channelApi } from '../services/channelsApi';
import { categoriesApi } from '../services/categoriesApi';
import { attributesApi } from '../services/attributesApi';
import { productClassificationsApi } from '../services/productClassificationsApi';
import { lablesApi } from '../services/lablesApi';
import { sitesApi } from '../services/sitesApi';
import { blockApi } from '../services/blockApi';

// ==============================|| persist reducer ||============================== //
const persistConfig = {
  key: 'root',
  version: 1.011,
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_PERSIST_ENCRYPT_KEY,
      onError: (error: Error) => {
        console.log('persist encrypt transform error :>> ', error);
      }
    })
  ],
  blacklist: ['workspaceSlice']
};

const rootReducer = combineReducers({
  themeReducer,
  appReducer,
  authReducer
});

type RootReducer = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);

// ==============================|| store ||============================== //
export const store = configureStore({
  reducer: {
    workspaceReducer,
    blockReducer,
    siteReducer,
    blockDetailReducer,
    blockUpdateValueReducer,
    skuDetailReducer,
    searchSliceReducer,

    persist: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [attributesApi.reducerPath]: attributesApi.reducer,
    [productClassificationsApi.reducerPath]: productClassificationsApi.reducer,
    [lablesApi.reducerPath]: lablesApi.reducer,
    [sitesApi.reducerPath]: sitesApi.reducer,
    [blockApi.reducerPath]: blockApi.reducer
  },
  middleware: (getDefaultMiddelware) =>
    getDefaultMiddelware({
      serializableCheck: false
    }).concat([
      authApi.middleware,
      workspaceApi.middleware,
      channelApi.middleware,
      categoriesApi.middleware,
      attributesApi.middleware,
      productClassificationsApi.middleware,
      lablesApi.middleware,
      sitesApi.middleware,
      blockApi.middleware
    ])
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

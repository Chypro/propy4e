import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery
} from '@reduxjs/toolkit/query';
import { RootState } from '../store/store';
import { loggedOut } from '../features/authSlice';

// ==============================|| Base Query ||============================== //
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).persist.authReducer.jwt.token;

    if (token !== '') {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

export const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      // 401 Unauthorized
      // console.log('Unauthorized :>> ', result);
      api.dispatch(loggedOut());
      // api.dispatch(setForceRedirectLocation(''));
    }

    if (result.error && result.error.status === 403) {
      // 403 forbidden
    }

    return result;
  };

// ==============================|| Dynamic Base Query ||============================== //
const DYNAMIC_URL = import.meta.env.VITE_BACKEND_DYNAMIC_URL;
const rawDynamicBaseQuery = fetchBaseQuery({
  baseUrl: DYNAMIC_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).persist.authReducer.jwt.token;

    if (token !== '') {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

export const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const workspaceDomain = (api.getState() as RootState).persist.appReducer.selectedWorkspaceDomain;

  if (!workspaceDomain || workspaceDomain === '') {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No workspace domain received.'
      }
    };
  }

  const urlEnd = typeof args === 'string' ? args : args.url;
  // console.log('urlEnd :>> ', urlEnd);
  // construct a dynamically generated portion of the url
  const adjustedUrl = DYNAMIC_URL.replace(':workspaceDomain', workspaceDomain) + urlEnd;
  // console.log('adjustedUrl :>> ', adjustedUrl);

  const adjustedArgs = typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };

  // provide the amended url and other params to the raw base query
  return rawDynamicBaseQuery(adjustedArgs, api, extraOptions);
};

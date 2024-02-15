import { createApi } from '@reduxjs/toolkit/query/react';

import { GetUserResopnse, LoginRequest } from '../types/api/auth';
import { apiRoute } from '../utils/routes';

import { baseQuery, baseQueryWithReauth } from './api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth(baseQuery),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (loginRequest) => ({
        url: apiRoute.login,
        method: 'POST',
        body: loginRequest
      })
    }),
    getUser: builder.query<GetUserResopnse, void>({
      query: () => ({
        url: apiRoute.user,
        method: 'GET'
      })
    })
  })
});

export const { useUserLoginMutation, useGetUserQuery } = authApi;

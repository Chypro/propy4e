import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth, dynamicBaseQuery } from './api';
import {
  GetCategoriesResponse,
  RegisterCategoriesRequest,
  UpdateCategoryRequest
} from '../types/api/category';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryWithReauth(dynamicBaseQuery),
  endpoints: (builder) => ({
    getCategories: builder.mutation<GetCategoriesResponse, number>({
      query: (channel) => ({
        url: `/channels/${channel}/categories`,
        method: 'GET'
      })
    }),
    deleteCategories: builder.mutation<any, string>({
      query: (id) => ({
        url: `/categories/delete/${id}`,
        method: 'POST'
      })
    }),
    registerCategories: builder.mutation<any, RegisterCategoriesRequest>({
      query: ({ body }) => ({
        url: `/categories/list/register`,
        method: 'POST',
        body
      })
    }),
    updateCategories: builder.mutation<any, UpdateCategoryRequest>({
      query: ({ body }) => ({
        url: `/categories/list/update`,
        method: 'POST',
        body
      })
    })
  })
});
export const {
  useGetCategoriesMutation,
  useUpdateCategoriesMutation,
  useRegisterCategoriesMutation,
  useDeleteCategoriesMutation
} = categoriesApi;

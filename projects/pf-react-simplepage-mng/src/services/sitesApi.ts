import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth, dynamicBaseQuery } from './api';
import { getSiteListResponse } from '../types/api/site';
import { GetCategoriesResponse } from '../types/api/category';

export const sitesApi = createApi({
  reducerPath: 'sitesApi',
  baseQuery: baseQueryWithReauth(dynamicBaseQuery),
  endpoints: (builder) => ({
    getSiteList: builder.query<getSiteListResponse, void>({
      query: () => ({
        url: '/spbaitai/search',
        method: 'POST'
      })
    }),
    createSite: builder.mutation<any, createSiteRequestType>({
      query: ({ body }) => ({
        url: '/spbaitai/register',
        method: 'POST',
        body
      })
    }),
    updateSite: builder.mutation<any, updateSiteRequestType>({
      query: ({ body, siteCd }) => ({
        url: `/spbaitai/update/${siteCd}`,
        method: 'POST',
        body
      })
    }),
    deleteSite: builder.mutation<any, string>({
      query: (id) => ({
        url: `/spbaitai/delete/${id}`,
        method: 'POST'
      })
    }),
    getSiteCategories: builder.query<GetCategoriesResponse, string>({
      query: (siteCd) => ({
        url: `/spcategories/${siteCd}/categories`,
        method: 'GET'
      })
    }),
    createSiteCategory: builder.mutation<any, createSiteCategoryRequestType>({
      query: ({ siteCd, body }) => ({
        url: `/spcategories/${siteCd}/categories/register`,
        method: 'POST',
        body
      })
    }),
    updateSiteCategory: builder.mutation<any, updateSiteCategoryRequest>({
      query: ({ body }) => ({
        url: `/spcategories/children/update`,
        method: 'POST',
        body
      })
    }),
    deleteSiteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/spcategories/children/delete/${id}`,
        method: 'POST'
      })
    })
  })
});

export const {
  useGetSiteListQuery,
  useCreateSiteMutation,
  useUpdateSiteMutation,
  useGetSiteCategoriesQuery,
  useCreateSiteCategoryMutation,
  useDeleteSiteCategoryMutation,
  useDeleteSiteMutation,
  useUpdateSiteCategoryMutation
} = sitesApi;
export type createSiteRequestType = {
  body: createSiteBodyType;
};
export type createSiteBodyType = {
  explan: string;
  name: string;
};
export type updateSiteRequestType = {
  body: updateSiteBodyType;
  siteCd: string;
};
export type updateSiteBodyType = {
  cd: string;
  explan: string;
  name: string;
};

export type createSiteCategoryBodyType = {
  name: string;
  order: number;
};

export type createSiteCategoryRequestType = {
  siteCd: string;
  body: createSiteCategoryBodyType[];
};

export type updateSiteCategoryRequest = {
  body: {
    categories: [
      {
        code: string;
        img: string | null;
        name: string;
        note: string | null;
      }
    ];
  };
};

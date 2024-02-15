import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth, dynamicBaseQuery } from './api';
import { apiRoute } from '../utils/routes';
import {
  GetLablesListResponse,
  UpdateLabelsOfSkuResponse,
  UpdateLablesOfSkuRequest,
  updateLablesRequestType
} from '../types/api/lable';

export const lablesApi = createApi({
  reducerPath: 'lablesApi',
  baseQuery: baseQueryWithReauth(dynamicBaseQuery),
  endpoints: (builder) => ({
    getLablesLIst: builder.query<GetLablesListResponse, void>({
      query: () => ({
        url: '/labels',
        method: 'GET'
      })
    }),
    updateLables: builder.mutation<any, updateLablesRequestType>({
      query: ({ body }) => ({
        url: '/labels/list/manage',
        method: 'POST',
        body
      })
    }),
    //SKUに紐づくラベルのアップデート
    updateLablesOfSku: builder.mutation<UpdateLabelsOfSkuResponse, UpdateLablesOfSkuRequest>({
      query: ({ body, id }) => ({
        url: `/products/update/${id}/labels`,
        method: 'POST',
        body
      })
    })
  })
});

export const { useGetLablesLIstQuery, useUpdateLablesMutation, useUpdateLablesOfSkuMutation } =
  lablesApi;

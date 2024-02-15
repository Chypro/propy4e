import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth, dynamicBaseQuery } from './api';
import { updateOrderRequestType } from '../types/app/attributes';
import {
  AttributeWithClassificationResponse,
  GetAttributesResponse,
  UpdateAttributesBody
} from '../types/api/attributes';

export const attributesApi = createApi({
  reducerPath: 'attributesApi',
  baseQuery: baseQueryWithReauth(dynamicBaseQuery),
  endpoints: (builder) => ({
    getAttributes: builder.query<GetAttributesResponse, void>({
      query: () => ({
        url: '/attributes/list/basic',
        method: 'GET'
      })
    }),
    getAttributesByProductClassification: builder.mutation<
      AttributeWithClassificationResponse,
      string
    >({
      query: (cd) => ({
        url: `/product_classifications/${cd}/attributes`,
        method: 'GET'
      })
    }),
    //商品分類ごとの項目一覧、チャンネルは0で固定
    getAttributesByProductClassificationAndChannel: builder.mutation<
      any,
      { classificationCd: string; channel: number }
    >({
      query: ({ classificationCd, channel }) => ({
        url: `/product-classification-channel-attributes/${classificationCd}/${channel}/0`,
        method: 'GET'
      })
    }),
    getAttributesDetail: builder.mutation<any, string>({
      query: (attributeCd) => ({
        url: `/attributes/detailed/${attributeCd}`,
        method: 'GET'
      })
    }),
    //項目の設定タブ→項目の値編集
    updateAttribute: builder.mutation<any, updateValueRequestType>({
      query: ({ attributeCd, body }) => ({
        url: `/attributes/update/${attributeCd}`,
        method: 'POST',
        body
      })
    }),
    //項目の設定タブ→項目の削除
    deleteAttribute: builder.mutation<any, DeleteAttributeRequest>({
      query: ({ attrId }) => ({
        url: `/attributes/delete/${attrId}`,
        method: 'POST'
      })
    }),
    //項目の設定タブ→項目の登録
    registerAttribute: builder.mutation<any, RegisterAttributeRequest>({
      query: ({ body }) => ({
        url: `/attributes/register`,
        method: 'POST',
        body
      })
    }),
    //商品分類設定タブ→各商品分類押下後→項目の値編集
    updateAttributesByProductClassificationAndChannel: builder.mutation<
      any,
      updateValueByProductClassificationAndChannelRequestType
    >({
      query: ({ body, attributeCode, classificationCode }) => ({
        url: `/product_classifications/${classificationCode}/attributes/update/${attributeCode}`,
        method: 'POST'
      })
    }),
    //商品分類設定タブ→各商品分類押下後→ドラッグアンドドロップでの入れ替えのリクエスト
    updateOrderAttributesByProductClassificationAndChannel: builder.mutation<
      any,
      updateOrderRequestType
    >({
      query: ({ classificationCd, attributes }) => ({
        url: `/product_classifications/${classificationCd}/attributes/order`,
        method: 'POST',
        body: { attributes }
      })
    })
  })
});

export const {
  useGetAttributesQuery,
  useRegisterAttributeMutation,
  useGetAttributesDetailMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAttributesByProductClassificationMutation,
  useGetAttributesByProductClassificationAndChannelMutation,
  useUpdateAttributesByProductClassificationAndChannelMutation,
  useUpdateOrderAttributesByProductClassificationAndChannelMutation
} = attributesApi;

type updateValueByProductClassificationAndChannelRequestType = {
  attributeCode: string;
  classificationCode: string;
  body: updateValueType;
};
export type updateValueRequestType = {
  body: updateValueType;
  attributeCd: string;
};

export type updateValueType = {
  alternative_name: string;
  control_type: string;
  default_value: string;
  is_private: number;
  is_with_unit: number;
  max_length: string;
  not_null: number;
  select_list: string;
  unit: string;
};

export type DeleteAttributeRequest = {
  attrId: string;
};

export type RegisterAttributeRequest = {
  body: RegisterAttributeBody;
};

export type RegisterAttributeBody = { name: string; with_unit: number }[];

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth, dynamicBaseQuery } from './api';
import {
  createProductClassificationRequest,
  registerAttributestoProductClassificationRequest
} from '../types/api/productClassification';

export const productClassificationsApi = createApi({
  reducerPath: 'productClassificationsApi',
  baseQuery: baseQueryWithReauth(dynamicBaseQuery),
  endpoints: (builder) => ({
    //全ての商品分類の取得
    getproductClassifications: builder.query<any, void>({
      query: () => ({
        url: '/product_classifications/list',
        method: 'GET'
      })
    }),
    //新たに商品分類を作成
    createProductClassification: builder.mutation<void, createProductClassificationRequest>({
      query: ({ body }) => ({
        url: '/product_classifications/register',
        method: 'POST',
        body
      })
    }),
    //作成した商品分類に値を追加
    registerAttributestoProductClassification: builder.mutation<
      any,
      registerAttributestoProductClassificationRequest
    >({
      query: ({ body, productClassificationCd }) => ({
        url: `/product_classifications/${productClassificationCd}/attributes/register`,
        method: 'POST',
        body
      })
    }),
    //登録シートのダウンロード
    downloadProdutClassifficationRegisterSheet: builder.mutation<void, void>({
      query: () => ({
        url: '/product_classifications/dldata',
        method: 'POST'
      })
    }),
    //Excelシートでの登録
    createAttributesByImport: builder.mutation<any, any>({
      query: (excelFile) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', excelFile);
        return {
          url: '/product_classifications/impdata/excel',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;'
          },
          body: bodyFormData
        };
      }
    })
  })
});

export const { useGetproductClassificationsQuery } = productClassificationsApi;

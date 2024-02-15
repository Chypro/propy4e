import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth, dynamicBaseQuery } from './api';
import {
  BlockResponseType,
  DownloadBlockFileRequest,
  DownloadSkuFileRequest,
  GetBlockDetailResponse,
  GetBlockSearchedRequest,
  GetFilteredBlockListRequest,
  GetFilteredBlockListResponse,
  RegisterBlockRequest,
  RegisterBlockResponse,
  RegisterSkuRequest,
  RegisterSkuResponse,
  UpdateBlockRequest,
  UpdateBlockResponse,
  UpdateCategoryOfBlockRequest,
  UpdateCategoryOfBlockRespose,
  getBlockDisplayRequestType,
  getIsNameConfirmRequest,
  getSkuDisplayRequest,
  getSkuListResponse,
  getSortedBlockByCategoryRequestType,
  getSortedBlockBySiteCategoryRequestType
} from '../types/api/block';
import { GetSkuDetailResponse } from '../types/api/sku';

export const blockApi = createApi({
  reducerPath: 'blockApi',
  baseQuery: baseQueryWithReauth(dynamicBaseQuery),
  endpoints: (builder) => ({
    //ブロックの取得
    getBlockDisplayList: builder.mutation<BlockResponseType, getBlockDisplayRequestType>({
      query: ({ offset, pagination, sort, order, deleted, channelCd }) => ({
        url: `/series/includes_accepted?offset=${offset}&pagination=${pagination}&sort=${sort}&order=${order}&deleted=${deleted}&channelCd=${channelCd}`,
        method: 'GET'
      })
    }),
    //キーワード検索
    getBlockSearched: builder.mutation<BlockResponseType, GetBlockSearchedRequest>({
      query: ({ pagination, searchedTerm }) => ({
        url: `/series/includes_accepted?offset=0&pagination=${pagination}&search=${searchedTerm}&sort=series&order=asc&deleted=0&channelCd=0`,
        method: 'GET'
      })
    }),
    //ブロック一覧のカテゴリー検索
    getSortedBlockByCategory: builder.mutation<
      GetBlockDetailResponse,
      getSortedBlockByCategoryRequestType
    >({
      query: ({ offset, pagination, deleted, id }) => ({
        url: `/series/includes_accepted?offset=${offset}&pagination=${pagination}&category=${id}&sort=series&order=asc&deleted=${deleted}&channelCd=0`,
        method: 'GET'
      })
    }),
    //ブロック一覧のサイトカテゴリー検索
    getSortedBlockBySiteCategory: builder.mutation<
      GetBlockDetailResponse,
      getSortedBlockBySiteCategoryRequestType
    >({
      query: ({ offset, pagination, deleted, id, siteId }) => ({
        url: `/series/includes_accepted?offset=${offset}&pagination=${pagination}&category=${id}&sort=series&order=asc&deleted=${deleted}&channelCd=0&spBaitai=${siteId}`,
        method: 'GET'
      })
    }),
    //SKU一覧の情報取得
    getSkuDisplayList: builder.mutation<getSkuListResponse, getSkuDisplayRequest>({
      query: ({ offset, pagination, deleted, blockId, acceptance, order }) => ({
        url: `/series/${blockId}/products?offset=${offset}&pagination=${pagination}&sort=cd&order=${order}&acceptance=${acceptance}&deleted=${deleted}`,
        method: 'GET'
      })
    }),
    //ブロックのダウンロード（Excelファイル）
    downloadBlockFile: builder.mutation<any, DownloadBlockFileRequest>({
      query: ({ body, nameList }) => ({
        url: `/channel/product/download/0/0`,
        method: 'POST',
        body,
        responseHandler: async (response) => {
          const blob = await response.blob();

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = nameList.length === 1 ? `${nameList[0]}.xlsx` : 'inputSheet.zip';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
        cache: 'no-cache'
      })
    }),
    //SKUのダウンロード（Excelファイル）
    downloadSkuFile: builder.mutation<any, DownloadSkuFileRequest>({
      query: ({ body, name }) => ({
        url: `/channel/product/download/0/0`,
        method: 'POST',
        body,
        responseHandler: async (response) => {
          const blob = await response.blob();

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${name}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
        cache: 'no-cache'
      })
    }),
    //ブロック詳細画面でのサイトカテゴリーの登録
    updateCategoryOfBlock: builder.mutation<
      UpdateCategoryOfBlockRespose,
      UpdateCategoryOfBlockRequest
    >({
      query: ({ body }) => ({
        url: `/products/category_sp/list`,
        method: 'POST',
        body
      })
    }),
    //名前があっているか
    getIsNameConfirm: builder.mutation<void, getIsNameConfirmRequest>({
      query: ({ body }) => ({
        url: `/series/name/confirm`,
        method: 'POST',
        body
      })
    }),
    //新ブロックの登録
    registerBlock: builder.mutation<RegisterBlockResponse, RegisterBlockRequest>({
      query: ({ body }) => ({
        url: `/series/register/2`,
        method: 'POST',
        body
      })
    }),
    //新SKUの登録
    registerSku: builder.mutation<RegisterSkuResponse, RegisterSkuRequest>({
      query: ({ body }) => ({
        url: `/products/register/2`,
        method: 'POST',
        body
      })
    }),
    //ブロック情報のアップデート（共通項目、名前、説明）
    updateBlock: builder.mutation<UpdateBlockResponse, UpdateBlockRequest>({
      query: ({ body, id }) => ({
        url: `/series/update/${id}`,
        method: 'POST',
        body
      })
    }),
    //ダウンロードシートのダウンロード
    getResisterDlSheet: builder.mutation<void, any>({
      query: ({ body, pclName }) => ({
        url: `/dlprddataupd/2`,
        method: 'POST',
        body,
        responseHandler: async (response) => {
          const blob = await response.blob();

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ブロック登録シート(${pclName}).xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
        cache: 'no-cache'
      })
    }),
    //ブロックの詳細
    getBlockDetail: builder.mutation<GetBlockDetailResponse, string>({
      query: (id) => ({
        url: `/series/${id}`,
        method: 'GET'
      })
    }),
    //SKUの詳細
    getSkuDetail: builder.mutation<GetSkuDetailResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      })
    }),
    //高度な検索時のリクエスト(filter )
    getFilteredBlockList: builder.mutation<
      GetFilteredBlockListResponse,
      GetFilteredBlockListRequest
    >({
      query: ({ body, queryParam }) => ({
        url: `/filters/products?offset=${queryParam.offset}&pagination=${queryParam.pagination}&sort=${queryParam.sort}&order=${queryParam.order}&state=${queryParam.state}`,
        method: 'POST',
        body
      })
    })
  })
});

export const {
  useGetBlockDisplayListMutation,
  useRegisterSkuMutation,
  useGetResisterDlSheetMutation,
  useGetBlockDetailMutation,
  useGetIsNameConfirmMutation,
  useGetSortedBlockByCategoryMutation,
  useRegisterBlockMutation,
  useGetSortedBlockBySiteCategoryMutation,
  useGetSkuDisplayListMutation,
  useUpdateBlockMutation,
  useUpdateCategoryOfBlockMutation,
  useGetSkuDetailMutation,
  useGetFilteredBlockListMutation,
  useDownloadBlockFileMutation,
  useDownloadSkuFileMutation,
  useGetBlockSearchedMutation
} = blockApi;

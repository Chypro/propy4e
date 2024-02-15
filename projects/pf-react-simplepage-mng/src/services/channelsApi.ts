import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth, dynamicBaseQuery } from './api';

export const channelApi = createApi({
  reducerPath: 'accessableChannelApi',
  baseQuery: baseQueryWithReauth(dynamicBaseQuery),
  endpoints: (builder) => ({
    getAccessibleChanelList: builder.query<any, void>({
      query: () => ({
        url: '/channels/accessible',
        method: 'GET'
      })
    })
  })
});

export const { useGetAccessibleChanelListQuery } = channelApi;

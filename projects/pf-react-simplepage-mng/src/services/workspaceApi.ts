import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth } from './api';
import {
  GetRollListRespose,
  GetWorkspaceListResponse,
  GetWorkspaceUserListResponse,
  GetWrokspaceDetailResponse,
  InviteUsersToWorkspaceRequest,
  InviteUsersToWorkspaceRespose,
  RegisterRollRequest,
  RegisterRollResponse
} from '../types/api/workspace';
import { apiRoute } from '../utils/routes';

export const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery: baseQueryWithReauth(baseQuery),
  endpoints: (builder) => ({
    //get list of all workspaces
    getWorkspaceList: builder.mutation<GetWorkspaceListResponse, void>({
      query: () => ({
        url: apiRoute.getWorkspaceList,
        method: 'GET'
      })
    }),
    //get list of workspace list assosiated with a given user
    getWorkspaceUserList: builder.mutation<GetWorkspaceUserListResponse, string>({
      query: (workspaceID: string) => ({
        url: apiRoute.getWorkspaceUserList.replace(':workspaceID', workspaceID),
        method: 'GET'
      })
    }),
    //get a detail of workspace
    getWorkspaceDetail: builder.mutation<GetWrokspaceDetailResponse, string>({
      query: (workspaceID) => ({
        url: `/wkspcusrlst/${workspaceID}`,
        method: 'GET'
      })
    }),
    //delete users from workspace
    deleteUserFromWrokSpace: builder.mutation<{ result: 'success' }, string>({
      query: (userId) => ({
        url: `/wkspcusrdel/${userId}`,
        method: 'POST'
      })
    }),
    //invite users to workspace
    inviteUsersToWorkspace: builder.mutation<
      InviteUsersToWorkspaceRespose,
      InviteUsersToWorkspaceRequest
    >({
      query: ({ workspaceId, body }) => ({
        url: `/wkspcusrinvt/${workspaceId}`,
        method: 'POST',
        body
      })
    }),
    //get roll list
    getRollList: builder.mutation<GetRollListRespose, void>({
      query: () => ({
        url: `/grpsch`,
        method: 'POST',
        body: {
          limit: 100,
          name: '',
          offset: 0
        }
      })
    }),
    //register a roll
    registerRoll: builder.mutation<RegisterRollResponse, RegisterRollRequest>({
      query: ({ body }) => ({
        url: `/grpnew`,
        method: 'POST',
        body
      })
    })
    // //get channels
    // registerRoll: builder.mutation<RegisterRollResponse, RegisterRollRequest>({
    //   query: ({ body }) => ({
    //     url: `/grpnew`,
    //     method: 'POST',
    //     body
    //   })
    // })
  })
});

export const { useGetWorkspaceListMutation, useGetWorkspaceUserListMutation } = workspaceApi;

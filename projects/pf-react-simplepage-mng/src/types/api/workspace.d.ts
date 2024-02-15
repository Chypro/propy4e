export type GetWorkspaceListResponse = {
  result: string;
  data: {
    code: string;
    id: string;
    name: string;
    domain: string;
    user_uuid: string;
    mode: number;
  }[];
};

export type GetWorkspaceUserListResponse = {
  result: string;
  data: {
    id: string;
    user_uuid: string;
    admin: string;
    valid: string;
    username: string;
    firstname: string;
    lastname: string;
  }[];
};

//get a detail of workspace
export type GetWrokspaceDetailResponse = {
  result: 'success';
  data: {
    admin: string;
    firstname: string;
    id: string;
    lastname: string;
    user_uuid: string;
    username: string;
    valid: string;
  }[];
};

//invite users to workspace
export type InviteUsersToWorkspaceRequest = {
  workspaceId: string;
  body: InvitedUser[];
};

export type InvitedUser = {
  invite_role: string;
  main: string;
};

export type InviteUsersToWorkspaceRespose = {
  result: 'success';
  warnmsg: string;
  invitecount: number;
  invite_statuses: InviteStatues;
};

export type InviteStatues = {
  [email: string]: {
    registered: boolean;
    invite_sent: boolean;
  };
};

//get roll list
export type GetRollListRespose = {
  count: number;
  result: 'success';
  data: Roll[];
};
export type Roll = {
  id: number;
  name: string;
  role: string;
};

//register a roll
export type RegisterRollRequest = {
  body: {
    name: string;
    role: {
      management: Permissions;
      settings: Permissions;
      channels: Permissions[];
    };
  };
};

export type Permissions = {
  can_access_access: boolean;
  can_access_role: boolean;
  can_access_user: boolean;
};
export type RegisterRollResponse = {
  grp_id: number;
  result: 'success';
};

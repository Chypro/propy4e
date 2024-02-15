export type Workspace = {
  code: string;
  id: string;
  name: string;
  domain: string;
  userUuid: string;
  mode: number;
  memberCount: number;
  members: {
    id: string;
    userUuid: string;
    admin: string;
    valid: string;
    userName: string;
    firstName: string;
    lastName: string;
  }[];
};

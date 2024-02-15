export type JWT = {
  refreshToken: string;
  token: string;
};

export type User = {
  uuid: string;
  userID: string;
  firstName: string;
  lastName: string;
  isSuper: boolean;
};

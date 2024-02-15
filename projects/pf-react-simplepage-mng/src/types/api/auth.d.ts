export type LoginRequest = {
  user_id: string;
  password: string;
};

export type LoginResponse = {
  data: {
    detail?: string;
    status: 'FAILED' | 'SUCCESS';
    refresh_token?: string;
    token?: string;
  };
};

export type LoginResponseError = {
  error: {
    error: string;
    status: string | number;
  };
};

export type GetUserResopnse = {
  result: string;
  data: {
    uuid: string;
    user_id: string;
    firstname: string;
    lastname: string;
    is_super: number;
  };
};

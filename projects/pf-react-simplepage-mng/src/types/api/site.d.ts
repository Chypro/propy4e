export type getSiteListResponseData = {
  cd: string;
  name: string;
  explan: string;
}

export type getSiteListResponse = {
  result: string;
  data: getSiteListResponseData[];
};

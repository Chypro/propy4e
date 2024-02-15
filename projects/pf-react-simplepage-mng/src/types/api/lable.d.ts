export type updateLablesRequestType = {
  body: {
    update: labelType[];
    delete: labelType[];
    create: labelType[];
  };
};

export type labelType = {
  color: string;
  id: string;
  name: string;
};

export type GetLablesListResponse = {
  data: GetLablesListBody;
  result: 'success';
};
export type GetLablesListBody = {
  [key: string]: Color;
};

export type Label = {
  id: number;
  name: string;
  color: string;
};

export type UpdateLablesOfSkuRequest = {
  id: string;
  body: UpdateLablesOfSkuBody;
};

export type UpdateLablesOfSkuBody = {
  labels: string;
};

export type UpdateLabelsOfSkuResponse = {
  result: 'success';
};

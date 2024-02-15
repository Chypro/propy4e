export type RegisterCategoriesRequest = {
  body: RegisterCategoriesBody;
};

export type RegisterCategoriesBody = {
  categories: { name: string; order: number }[];
  parent_code: string;
};

export type UpdateCategoryRequest = {
  body: {
    categories: [{ code: string; name: string; note: string }];
  };
};

export type GetCategoriesResponse = {
  result: 'success';
  data: GetCategoriesData;
};

export type GetCategoriesData = {
  category: CategoryData;
  children: GetCategoriesData[];
};

export type CategoryData = {
  channel: number | null;
  code: string;
  created_by: string;
  img: string | null;
  is_deleted: string | null;
  is_leaf: string | null;
  labels: string | null;
  name: string | null;
  note: string | null;
  order: number | null;
  parent: any;
  updated_by: string | null;
};
export type CategoryByParent = {
  category: any;
  parent: CategoryByParent | null;
};

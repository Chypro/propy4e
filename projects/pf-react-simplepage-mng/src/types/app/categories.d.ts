export type FilteredSiteListType = {
  名前: string;
  コード: string;
};

export interface TreeNodeCategory {
  code: React.Key;
  name: string;
  note: string;
  img: string;
  img_mobile?: string;
}

export type TreeNodeType = {
  category: TreeNodeCategory;
  children?: TreeNodeType[];
};

export interface CategoryListProps {
  title: string;
  key: React.Key;
  img: string;
  note: string;
  img_mobile?: string;
}

export type Category = {
  value: string | null;
  label: string | null;
  children?: Category | null;
};

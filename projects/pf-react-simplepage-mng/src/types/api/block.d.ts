import { CategoryByParent } from './category';

export type BlockResponseType = {
  result: 'success';
  data: BlockPropaty[];
  total: number;
};

export type getSkuListResponse = {
  result: string;
  data: SkuListPropaty[];
  total: number;
  detailProduct: DetailProductItem[][];
};

export type getBlockDisplayRequestType = {
  offset: number;
  pagination: number;
  sort: 'series';
  order: 'asc';
  deleted: 0 | 1;
  channelCd: 0;
};

export type getSkuDisplayRequest = {
  offset: number;
  pagination: number;
  order: 'asc';
  acceptance: number;
  deleted: number;
  blockId: string;
};

export type getIsNameConfirmRequest = {
  body: { series_name: string };
};

export type getSortedBlockByCategoryRequestType = {
  offset: number;
  pagination: number;
  deleted: 0 | 1;
  id: string;
};
export type getSortedBlockBySiteCategoryRequestType = {
  offset: number;
  pagination: number;
  deleted: 0 | 1;
  id: string;
  siteId: string;
};

//キーワード検索のブロック取得
export type GetBlockSearchedRequest = {
  pagination: number;
  searchedTerm: string;
};

//ブロックのダウンロード
export type DownloadBlockFileRequest = {
  body: { prd_id: string }[];
  nameList: string[];
};
//SKUのダウンロード
export type DownloadSkuFileRequest = {
  body: { prd_id: string }[];
  name: string;
};

//高度な検索時のリクエスト（get filtered block list）
export type GetFilteredBlockListRequest = {
  body: GetFIlteredBlockListBody;
  queryParam: {
    offset: number;
    pagination: number;
    sort: 'series';
    order: 'asc';
    state: 2;
  };
};

export type GetFIlteredBlockListBody = {
  is_series: boolean;
  items: FilterCondition[];
};

export type FilterCondition = {
  item: string;
  condition: string;
  date?: Date | null; // Assuming date is optional and can be null
};


export type FilterCondition = {
  attribute_cd: string;
  operation: string;
  relation: string;
  value: string[];
};

export type GetFilteredBlockListResponse = {
  detailProduct: any[];
  products: BlockPropaty[];
  result: 'success';
  total: number;
};

//ブロック情報のアップデート（共通項目、名前、説明）
export type UpdateBlockRequest = {
  id: string;
  body: UpdateBlockBody;
};

export type UpdateBlockBody = {
  series: string;
  comform: {
    NOTE: string | null;
    pcl_datas: PclData[] | null;
  };
};
export type PclData = {
  cd: string;
  name: string | null;
  unit: string | null;
  val: string | null;
};

export type UpdateBlockResponse = {
  result: 'success';
};

//ブロック詳細画面でのサイトカテゴリーの登録
export type UpdateCategoryOfBlockRequest = {
  body: {
    category_codes: string[];
    channel_cd: string;
    product_codes: string[];
  };
};

export type UpdateCategoryOfBlockRespose = {
  result: 'success';
};

//新ブロックの登録
export type RegisterBlockResponse = {
  message: string;
  result: 'success';
  series_code: string;
};

export type RegisterBlockRequest = {
  body: {
    comform: CommonForm;
    product_classification_code: string;
    series: string;
    ucomform: UnCommonForm;
  };
};

export type CommonForm = {
  note: string | null;
  pcl_datas: {
    cd: string;
    name: string;
    unit: string | null;
    val: string;
  }[];
};

export type UnCommonForm = {
  M_PRICE_INC: null;
  M_TAX: null;
  NAME: null;
  NOTE: '';
  PRD_CD: string | null;
  pcl_datas: {
    cd: string;
    unit: string | null;
    val: string | null;
  }[];
}[];

//新SKUの登録
export type RegisterSkuRequest = {
  body: { product_classification_code: string; products: UnCommonForm; series: string };
};

export type RegisterSkuResponse = {
  message: string;
  registered_product_ids: string[];
  result: string;
};

// -----------------------------------
type BlockPropaty = {
  id: string;
  name: string;
  category_tree: CategoryTree[];
  sp_category_tree: CategoryTree[];
  discontinued: string;
  img: string;
  product_count: {
    [key: string]: number;
  };
  product_classification: {
    cd: string;
    name: string;
    is_deleted: string;
    created_by: string;
    updated_by: string;
  };
};

type Category = {
  category: {
    code: string;
    order: number;
    name: string;
    note: string;
    labels: string;
    is_deleted: string;
    is_leaf: string;
    created_by: string;
    updated_by: string;
    parent: string | null;
    channel: number;
  };
  parent: {
    category: {
      cd: number;
      name: string;
      is_deleted: string;
      date_format: string | null;
      boolean_format: string | null;
      decimal_format: string | null;
      output_type: string | null;
      created_by: string | null;
      updated_by: string | null;
    } | null;
  };
};

type CategoryTree = {
  category: Category;
  parent: Category | null;
};

type GetBlockDetailResponse = {
  data: GetBlockDetailBody;
  result: string;
};

type GetBlockDetailBody = {
  acpt_updated_user: string | null;
  attributes: {
    alternative_name: string | null;
    attribute: string;
    control_type: string;
    default_value: string | null;
    id: number;
    is_common: string;
    is_deleted: string;
    is_fixed: string;
    is_private: string;
    is_with_unit: string;
    max_length: number;
    name: string;
    not_null: string;
    order: number;
    select_list: string;
    unit: string;
    value: string;
  }[];
  category_tree: any[];
  id: string;
  img: string;
  labels: string;
  maker: string | null;
  parent: string | null;
  prd_acpt_note: string;
  prd_acpt_status: string;
  prd_aprv_last_upd_dt: string | null;
  prd_brand_nm: string;
  prd_cd: string;
  prd_crt_ur_cd: string;
  prd_del: string;
  prd_haiban: string;
  prd_jan: string;
  prd_kana: string;
  prd_m_price: any;
  prd_m_price_inctax: any;
  prd_m_tax: any;
  prd_mk_hinban: string;
  prd_mng_id: string;
  prd_name: string;
  prd_name_en: string;
  prd_note: string;
  prd_per_unit_u: string;
  prd_per_unit_v: any;
  prd_series: string;
  prd_sku_flg: string;
  prd_sp_tanto: string;
  prd_tax_cd: string;
  prd_upd_ur_cd: string;
  product_classification: {
    cd: string;
    created_by: string;
    is_deleted: string;
    name: string;
    updated_by: string;
  };
  product_count: any;
  sp_category_tree: CategoryByParent[];
  supplier: any;
  url: string;
};

export type SkuListPropaty = {
  id: string;
  cd: string;
  acpt_status: any[];
  name: string;
  series: string;
  name_en: string;
  name_kana: string;
  brand: string;
  mk_hinban: string;
  maker: null;
  supplier: null;
  m_price: number;
  jan: string;
  note: string;
  labels: string;
  discontinued: string;
  per_unit_v: null;
  tax: string;
  url: string;
  product_classification: {
    cd: string;
    name: string;
    is_deleted: string;
    created_by: string;
    updated_by: string;
  };
  category_tree: any[];
  img: string;
  parent: string;
};

export type DetailProductItem = {
  prda_item_no: string;
  prda_value: string;
};

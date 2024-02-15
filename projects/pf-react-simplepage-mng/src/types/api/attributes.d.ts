export enum InputType {
  SINGLE_LINE = '0',
  MULTI_LINE = '1',
  COMBO_INPUT = '2',
  RADIO_INPUT = '3',
  CHECKBOX_INPUT = '4',
  NUMBER_INPUT = '5',
  DATE_INPUT = '6'
}
export type createAttributeRequest = {
  body: createAttributeBody;
};

export type createAttributeBody = {
  name: string;
  with_unit: 0;
}[];

export type AttributeWithClassificationResponse = {
  result: 'success';
  data: AttributesWithClassificationData[];
};

//全項目の取得
export type GetAttributesResponse = {
  result: 'success';
  data: Attribute[];
};

export type AttributesWithClassificationData = {
  alternative_name: null | string;
  attribute_id: null | string;
  control_type: InputType;
  default_value: null | string;
  id: number;
  is_common: string;
  is_deleted: null | string;
  is_fixed: null | string;
  is_private: null | string;
  is_with_unit: null | string;
  max_length: number;
  name: null | string;
  not_null: null | string;
  option1: null | string;
  option2: null | string;
  option3: null | string;
  order: number;
  original_name: null | string;
  product_classification_id: null | string;
  select_list: null | string;
  unit: null | string;
};

export type UpdateAttributesBody = Attribute;

export type Attribute = {
  cd: string;
  name: string;
  controlType?: InputType;
  createdAt: string;
  createdById: string;
  defaultValue?: string | null;
  isCommon?: string | null;
  isDeleted: string;
  isFixed: string;
  isPrivate: string;
  isWithUnit: string;
  maxLength?: number | null;
  notNull?: string | null;
  option1: string;
  option2: string;
  option3: string;
  order?: number | null;
  selectList?: string | null;
  unit?: string | null;
  updatedAt: string;
  updatedById: string;
};

export enum InputType {
  SINGLE_LINE = '0',
  MULTI_LINE = '1',
  COMBO_INPUT = '2',
  RADIO_INPUT = '3',
  CHECKBOX_INPUT = '4',
  NUMBER_INPUT = '5',
  DATE_INPUT = '6'
}
export type updateOrderRequestType = {
  classificationCd: string;
  attributes: { cd: string; order: number }[];
};

export type Attributes = {
  id: number;
  cd: string;
  name: string | null;
  alterName: string | null;
  controlType: InputType;
  defaultValue: null | string;
  value: null | string;
  selectList: string[];
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

enum Enum {
  type1,
  type2,
  type3
}
type Type = {
  input: Enum;
};

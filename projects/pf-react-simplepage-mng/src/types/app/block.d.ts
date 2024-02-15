import { CategoryTree } from '../api/block';
import { CategoryByParent } from '../api/category';
import { Category } from './categories';

export type Block = {
  id: string;
  img: string;
  name: string;
  productClassification: {
    name: string;
  };
  spCategory: CategoryTree[];
};

export type SkuList = {
  id: string;
  img: string;
  name: string;
  productClassification: {
    name: string;
  };
};

export type Attribute = {
  cd: string;
  id: number;
  name: string;
  type: string;
  require: boolean;
  defaultValue: string;
  value: string;
  isWithUnit: boolean;
  units: string[];
  order: number;
  options: string[];
  maxLength: number;
  isCommon: boolean;
  isDeleted: boolean;
  isFixed: boolean;
  isPrivate: boolean;
};

export type BlockDetail = {
  id: string;
  img: string;
  name: string;
  description: string;
  attributes: Attribute[];
  categoryId: string;
  pclId: string;
};

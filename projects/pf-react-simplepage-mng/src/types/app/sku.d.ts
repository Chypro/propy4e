import { Attribute } from './block';

export type Sku = {
  cd: string;
  id: string;
  name: string | null;
  pclName: string;
  img: string | null;
  label: string;
  attributes: Attribute[];
};

import React, { useEffect, useState } from 'react';
import { CustomTable } from '..';
import { productsDami } from '../../data/products';
import { BlockManagementEnum } from '../../types/app/listmanagement';
type Props = {
  setcurrentPage: (e: BlockManagementEnum) => void;
};
const SkuListContent = ({ setcurrentPage }: Props) => {
  const sortedData = productsDami.map((item, i) => {
    return {
      商品コード: item.mk_hinban,
      商品名: item.name,
      JANコード: item.jan,
      型番: item.mk_hinban
    };
  });
  const [damiProducts, setdamiProducts] = useState(sortedData);
  const handleBlockClicked = (record: any, rowIndex: any) => {
    setcurrentPage(BlockManagementEnum.SKUDetail);
  };
  return (
    <div>
      <CustomTable
        data={[]}
        onEditClick={function (record: { key: React.Key } & { [x: string]: any }): void {
          throw new Error('Function not implemented.');
        }}
      ></CustomTable>
    </div>
  );
};

export default SkuListContent;

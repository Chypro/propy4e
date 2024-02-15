import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Table, TableColumnsType, Image, PaginationProps } from 'antd';
import { fallback } from '../../../data/imgFallback';
import { setCurrentPage, setPageSize } from '../../../features/blockSlice';
import { layout } from '../../../utils/constant';
type DataType = {
  key: React.Key;
  img: JSX.Element;
  blockName: string;
  category: string;
};
const columnIndex = {
  key: '',
  img: 'img',
  blockName: 'blockName',
  category: 'category'
};

const columns: TableColumnsType<DataType> = [
  { title: '画像', dataIndex: columnIndex.img, width: 80, align: 'center' },
  { title: 'ブロック名', dataIndex: columnIndex.blockName, ellipsis: true },
  { title: '所属カテゴリー', dataIndex: columnIndex.category, ellipsis: true }
];

type Props = {
  isLoading: boolean;
};
const BlockTableList = ({ isLoading }: Props) => {
  const { blockBlockList, total, currentPage, pageSize, selectedRowKeys } = useAppSelector(
    (state) => state.blockReducer
  );
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);
  const dispatch = useAppDispatch();

  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    let dataList: DataType[] = [];
    blockBlockList.map((blockBlcok) => {
      dataList.push({
        key: blockBlcok.id,
        img: <Image width={50} height={50} src={blockBlcok.img} fallback={fallback}></Image>,
        blockName: blockBlcok.name,
        category: 'カテゴリー――'
      });
    });

    setDataSource(dataList);
  }, [blockBlockList]);

  const handleRowSelect = () => {
    console.log('object');
  };
  const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    dispatch(setPageSize(size));
  };

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <>
      <Table
        scroll={{ y: screenSize.y - layout.header - layout.blockManage.header }}
        size="middle"
        dataSource={dataSource}
        columns={columns}
        loading={isLoading}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: handleRowSelect
        }}
        pagination={{
          total: total,
          current: currentPage,
          pageSize: pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [10, 25, 50, 100],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange
        }}
      ></Table>
    </>
  );
};

export default BlockTableList;

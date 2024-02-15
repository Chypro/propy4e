import { ConfigProvider, PaginationProps, Table, TableColumnsType, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  setCurrentPage,
  setPageSize,
  setSelectedRowKeys
} from '../../../features/blockDetailSlice';
import { useNavigate } from 'react-router-dom';
import { layout, paramKey } from '../../../utils/constant';
import { fallback } from '../../../data/imgFallback';
import { appRoute } from '../../../utils/routes';

import { setSelectedBlockDetailID } from '../../../features/appSlice';
import SkuDetailModal from '../../modals/SkuDetailModal';

type Props = {
  isLoading: boolean;
};
const SkuTableList = ({ isLoading }: Props) => {
  type DataType = {
    key: string;
    img: JSX.Element;
    blockName: string;
    // category: string;
    action: string;
  };

  const columnIndex = {
    key: '',
    img: 'img',
    blockName: 'blockName',
    category: 'category',
    action: 'action'
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: '画像',
      dataIndex: columnIndex.img,
      width: 80,
      align: 'center'
    },
    {
      title: '商品コード',
      dataIndex: columnIndex.blockName,
      ellipsis: true,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => handleRowClick(record, rowIndex)
        };
      }
    },
    {
      title: 'サイトカテゴリー',
      dataIndex: columnIndex.category,
      ellipsis: true,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => handleRowClick(record, rowIndex)
        };
      }
    },
    {
      title: 'アクション',
      dataIndex: columnIndex.action,
      ellipsis: true,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => handleRowClick(record, rowIndex)
        };
      }
    }
  ];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const { skuList, total, currentPage, pageSize, selectedRowKeys } = useAppSelector(
    (state) => state.blockDetailReducer
  );
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [isDetailModalOpen, setisDetailModalOpen] = useState(false);

  useEffect(() => {
    let dataList: DataType[] = [];

    skuList.map((data) => {
      dataList.push({
        key: data.id,
        img: <Image width={50} height={50} src={data.img} fallback={fallback}></Image>,
        blockName: data.name,
        action: ''
      });
    });

    setDataSource(dataList);
  }, [skuList]);

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    console.log('page :>> ', page);
    dispatch(setCurrentPage(page));
  };

  const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    console.log('size :>> ', size);
    console.log(current);
    dispatch(setPageSize(size));
  };

  const handleRowSelect = (newSelectedRowKeys: React.Key[]) => {
    console.log('newSelectedRowKeys :>> ', newSelectedRowKeys);
    dispatch(setSelectedRowKeys(newSelectedRowKeys));
  };

  const handleRowClick = (record: DataType, rowIndex: number) => {
    console.log('record :>> ', record);
    console.log('rowIndex :>> ', rowIndex);
    setisDetailModalOpen(true);
    // SkuDetailModal({ ModalProps: { title: 'skudetail' } });
    // dispatch(setSelectedBlockID(record.key));

    navigate({
      pathname: appRoute.skuDetail,
      search: `?${paramKey.skuDetail.id}=${record.key}`
    });
  };
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: themeColor[primaryColor][100],
              headerSplitColor: themeColor[primaryColor][100]
            }
          }
        }}
      >
        <Table
          loading={isLoading}
          scroll={{ y: `${screenSize.y - (layout.header + layout.blockManage.header + 160)}px` }}
          size="middle"
          dataSource={dataSource}
          columns={columns}
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
          // onRow={}
        />{' '}
      </ConfigProvider>
      <SkuDetailModal
        ModalProps={{ open: isDetailModalOpen, onCancel: () => setisDetailModalOpen(false) }}
      ></SkuDetailModal>
    </>
  );
};

export default SkuTableList;

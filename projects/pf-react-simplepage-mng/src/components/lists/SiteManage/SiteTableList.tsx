import { ConfigProvider, Table, TableColumnsType, Image, Skeleton, PaginationProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fallback } from '../../../data/imgFallback';
import {
  setCurrentPage,
  setPageSize,
  setSelectedBlockID,
  setSelectedRowKeys
} from '../../../features/siteSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { layout, paramKey } from '../../../utils/constant';
import { appRoute } from '../../../utils/routes';
import { setSelectedBlockDetailID } from '../../../features/appSlice';

const SiteTableList = ({ isLoading }: { isLoading: boolean }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
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
      title: 'ブロック名',
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
  const { siteBlockList, total, currentPage, pageSize, selectedRowKeys } = useAppSelector(
    (state) => state.siteReducer
  );
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);

  const [dataSource, setDataSource] = useState<DataType[]>([]);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handlePageChange: PaginationProps['onChange'] = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    dispatch(setPageSize(size));
  };

  const handleRowSelect = (newSelectedRowKeys: React.Key[]) => {
    dispatch(setSelectedRowKeys(newSelectedRowKeys));
  };

  const handleRowClick = (record: DataType, rowIndex: number) => {
    // dispatch(setSelectedBlockID(record.key));
    dispatch(setSelectedBlockDetailID(record.key));

    navigate({
      pathname: appRoute.blockDetail,
      search: `?${paramKey.blockDetail.id}=${record.key}`
    });
  };

  useEffect(() => {
    let dataList: DataType[] = [];
    siteBlockList.map((siteBlock) => {
      dataList.push({
        key: siteBlock.id,
        img: <Image width={50} height={50} src={siteBlock.img} fallback={fallback} />,
        blockName: siteBlock.name,
        action: ''
      });
    });
    setDataSource(dataList);
  }, [siteBlockList]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------

  return (
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
        scroll={{ y: `${screenSize.y - (layout.header + layout.blockManage.header + 160)}px` }}
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
        // onRow={}
      />
    </ConfigProvider>
  );
};

export default SiteTableList;

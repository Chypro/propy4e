import { Table, TableColumnsType, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setSelectedBlockDetailID } from '../features/appSlice';
import { useNavigate } from 'react-router-dom';
import { appRoute } from '../utils/routes';
import { paramKey } from '../utils/constant';
import { fallback } from '../data/imgFallback';

const SearchListPage = () => {
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
  const { isLoading, SearchedBlockList, searchTerm } = useAppSelector(
    (state) => state.searchSliceReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);
  const handleRowClick = (record: DataType, rowIndex: number) => {
    dispatch(setSelectedBlockDetailID(record.key));

    navigate({
      pathname: appRoute.blockDetail,
      search: `?${paramKey.blockDetail.id}=${record.key}`
    });
  };
  useEffect(() => {
    let dataList: DataType[] = [];
    console.log(SearchedBlockList);
    SearchedBlockList.map((siteBlock) => {
      dataList.push({
        key: siteBlock.id,
        img: <Image width={50} height={50} src={siteBlock.img} fallback={fallback} />,
        blockName: siteBlock.name,
        action: ''
      });
    });
    setDataSource(dataList);
  }, [SearchedBlockList]);
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div style={{ width: screenSize.x * 0.87 }}>
        <div className="ml-7 text-3xl my-5">{`"${searchTerm}" の検索結果`}</div>
        <div className=" flex justify-center">
          <Table columns={columns} dataSource={dataSource} loading={isLoading}></Table>
        </div>
      </div>
    </div>
  );
};

export default SearchListPage;

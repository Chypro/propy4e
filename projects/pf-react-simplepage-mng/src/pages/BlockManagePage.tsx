import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { BlockHeader, BlockTab, ProtectedRoute, SkuTab } from '../components';
import { ConfigProvider, Tabs, TabsProps, message } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { paramKey } from '../utils/constant';
import { useGetBlockDisplayListMutation } from '../services/blockApi';
import { BlockResponseType, getBlockDisplayRequestType } from '../types/api/block';
import { setBlockBlockList, setTotal } from '../features/blockSlice';
import { Block } from '../types/app/block';
import BlockGridList from '../components/lists/BlockManage/BlockGridList';
import BlockTableList from '../components/lists/BlockManage/BlockTableList';

const BlockManagePage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { currentPage, pageSize, blockDisplayMode } = useAppSelector((state) => state.blockReducer);
  enum BlockTabEnum {
    block = '1',
    sku = '2'
  }

  const [getBlockList, { isLoading }] = useGetBlockDisplayListMutation();
  const dispatch = useAppDispatch();

  const updateBlockList = () => {
    const request: getBlockDisplayRequestType = {
      offset: (currentPage - 1) * pageSize,
      pagination: pageSize,
      sort: 'series',
      order: 'asc',
      deleted: 0,
      channelCd: 0
    };
    getBlockList(request).then((res: any) => {
      if (res.error) {
        // message.error('ブロックリスト取得エラー');
      } else {
        const response = res.data as BlockResponseType;
        if (response.result === 'success') {
          dispatch(setTotal(response.total));

          let blockList: Block[] = [];
          response.data.map((data) => {
            const block: Block = {
              id: data.id,
              img: data.img,
              name: data.name,
              productClassification: {
                name: ''
              },
              spCategory: data.sp_category_tree
            };

            blockList.push(block);
          });

          dispatch(setBlockBlockList(blockList));
        }
      }
    });
  };

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedTab, setSelectedTab] = useState<BlockTabEnum>(BlockTabEnum.block);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleTabClick = (key: string) => {
    setSearchParams({ [paramKey.blockManage.tab]: key });
    setSelectedTab(key as BlockTabEnum);
  };

  useEffect(() => {
    if (searchParams.get(paramKey.setting.tab)) {
      const tab = searchParams.get(paramKey.blockManage.tab) as BlockTabEnum;
      if (Object.values(BlockTabEnum).includes(tab)) {
        setSelectedTab(tab);
      }
    }
    updateBlockList();
  }, []);

  useEffect(() => {
    console.log(selectedTab);
  }, [selectedTab]);

  useLayoutEffect(() => {
    updateBlockList();
  }, [currentPage, pageSize]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ProtectedRoute>
      <div className="w-full h-full p-4">
        <BlockHeader></BlockHeader>
        <div className="mt-2">
          {blockDisplayMode === 'table' && <BlockTableList isLoading={isLoading} />}
          {blockDisplayMode === 'grid' && <BlockGridList isLoading={isLoading} />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BlockManagePage;

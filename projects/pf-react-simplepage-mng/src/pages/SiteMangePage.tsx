import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useSearchParams } from 'react-router-dom';
import { NotFound, ProtectedRoute, SiteGridList, SiteHeader, SiteTableList } from '../components';
import { paramKey } from '../utils/constant';
import { useGetBlockDisplayListMutation } from '../services/blockApi';
import { message } from 'antd';
import { BlockResponseType, getBlockDisplayRequestType } from '../types/api/block';
import { setSiteBlockList, setTotal } from '../features/siteSlice';
import { Block } from '../types/app/block';
import { setSelectedSiteID } from '../features/appSlice';

const SiteMangePage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useAppDispatch();

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const { siteDisplayMode, currentPage, pageSize } = useAppSelector((state) => state.siteReducer);
  const { selectedSiteID } = useAppSelector((state) => state.persist.appReducer);

  const [searchParams, setSearchParams] = useSearchParams();
  const [getBlockList, { isLoading }] = useGetBlockDisplayListMutation();

  const [selectedTag, setSelectedTag] = useState<string>('');

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
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
          console.log(response.data);
          response.data.map((data) => {
            const block: Block = {
              id: data.id,
              img: data.img,
              name: data.name,
              productClassification: {
                name: data.product_classification.name
              },
              spCategory: data.sp_category_tree
            };
            blockList.push(block);
          });

          dispatch(setSiteBlockList(blockList));
        }
      }
    });
  };

  useEffect(() => {
    if (searchParams.get(paramKey.media.tag)) {
      const tag = searchParams.get(paramKey.media.tag);
      if (tag !== '') {
        updateBlockList();
      }
      dispatch(setSelectedSiteID(tag ?? ''));
      setSelectedTag(tag ?? '');
    } else {
      setSelectedTag('');
      dispatch(setSelectedSiteID(''));
    }
  }, [searchParams]);

  useLayoutEffect(() => {
    updateBlockList();
  }, [currentPage, pageSize]);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ProtectedRoute>
      {/* {selectedTag === '' ? (
        <NotFound />
      ) : ( */}
      <div
        style={{ backgroundColor: themeColor.gray[50], color: themeColor.gray[700] }}
        className="w-full h-full p-4"
      >
        {/* header */}
        <SiteHeader />

        <div className="mt-2">
          {siteDisplayMode === 'table' && <SiteTableList isLoading={isLoading} />}
          {siteDisplayMode === 'grid' && <SiteGridList isLoading={isLoading} />}
        </div>
      </div>
      {/* )} */}
    </ProtectedRoute>
  );
};

export default SiteMangePage;

import React, { useEffect } from 'react';
import { useGetSkuDisplayListMutation } from '../../../services/blockApi';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getSkuDisplayRequest, getSkuListResponse } from '../../../types/api/block';
import { Table, message } from 'antd';
import { setSkuList, setTotal } from '../../../features/blockDetailSlice';
import SkuHeader from '../../headers/SkuManage/SkuHeader';
import SkuGridList from '../../lists/SkuManage/SkuGridList';
import { SkuList } from '../../../types/app/block';
import { useSearchParams } from 'react-router-dom';
import { paramKey } from '../../../utils/constant';
import SkuTableList from '../../lists/SkuManage/SkuTableList';

const BlockDetailSkuTab = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [getSkuList, { isSuccess, isLoading }] = useGetSkuDisplayListMutation();
  const { blockDetail, skuList, currentPage, pageSize, total, selectedRowKeys, skuDisplayMode } =
    useAppSelector((state) => state.blockDetailReducer);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const updateSkuList = () => {
    const request: getSkuDisplayRequest = {
      pagination: pageSize,
      order: 'asc',
      acceptance: 9,
      deleted: 0,
      blockId: blockDetail?.id,
      offset: (currentPage - 1) * pageSize
    };
    getSkuList(request).then((res: any) => {
      if (res.error) {
        message.error('SKU情報取得エラーが発生しました。');
      } else {
        console.log(res);
        const response = res.data as getSkuListResponse;
        if (response.result === 'success') {
          dispatch(setTotal(response.total));
          console.log(response);
          let SkuList: SkuList[] = [];
          response.data.map((data) => {
            const Sku: SkuList = {
              id: data.id,
              img: data.img,
              name: data.cd,
              productClassification: {
                name: data.product_classification.name
              }
            };
            SkuList.push(Sku);
          });

          console.log(skuList);
          dispatch(setSkuList(SkuList));
        }
      }
    });
  };
  useEffect(() => {
    updateSkuList();
  }, [searchParams]);

  useEffect(() => {
    console.log(skuList);
  }, [blockDetail]);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <div className="w-full h-full p-2 ">
        <SkuHeader></SkuHeader>
        <div className="mt-2">
          {skuDisplayMode === 'table' && <SkuTableList isLoading={isLoading} />}
          {skuDisplayMode === 'grid' && <SkuGridList />}
        </div>
      </div>
    </div>
  );
};

export default BlockDetailSkuTab;

import React, { useEffect } from 'react';
import { useGetSkuDisplayListMutation } from '../../../services/blockApi';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getSkuDisplayRequest } from '../../../types/api/block';
import { message } from 'antd';
import { setSkuList, setTotal } from '../../../features/blockDetailSlice';
import {} from '../../../types/app/block';

export const BlockDetailSkuTab = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const [getSkuList, { isSuccess }] = useGetSkuDisplayListMutation();
  const { blockDetail, skuList, currentPage, pageSize, total, selectedRowKeys, skuDisplayMode } =
    useAppSelector((state) => state.blockDetailReducer);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
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
        const response = res.data;
        if (response.result === 'success') {
          dispatch(setTotal(response.total));
          let SkuList: any[] = [];
          response.data.map((data) => {
            const Sku: any = {
              id: data.id,
              img: data.img,
              name: data.name,
              productClassification: {
                name: data.product_classification.name
              }
            };
            SkuList.push(Sku);
          });
          dispatch(setSkuList(SkuList));
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log(skuList);
  }, [blockDetail]);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return <div></div>;
};

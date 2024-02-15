import React, { useEffect, useState } from 'react';
import { useGetproductClassificationsQuery } from '../../services/productClassificationsApi';
import { useGetAttributesByProductClassificationMutation } from '../../services/attributesApi';

export const ProductClassificationSettingTab = () => {
  const { data, isSuccess } = useGetproductClassificationsQuery();
  const [getAttributesByClassification, { isError, isSuccess: isSuccessTwo }] =
    useGetAttributesByProductClassificationMutation();
  const [displayAttribute, setdisplayAttribute] = useState();
  useEffect(() => {
    if (isSuccess) console.log(data);
  }, [data]);

  return <div className="w-full h-[500px] flex justify-center items-center">商品分類設定タブ</div>;
};

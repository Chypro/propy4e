import { Modal, ModalProps, Space, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import SpreadSheet from '../datadisplay/SpreadSheet';
import { useAppSelector } from '../../store/store';
import { useGetAttributesByProductClassificationMutation } from '../../services/attributesApi';
import { AttributeWithClassificationResponse } from '../../types/api/attributes';
import { Attributes } from '../../types/app/attributes';
import { convertStringOptionToArray } from '../../utils/utils';
import { INPUT_TYPES } from '../../utils/constant';
import { SheetRow } from '../../types/app/spreadsheet';
import { useRegisterSkuMutation } from '../../services/blockApi';
import { RegisterSkuRequest, RegisterSkuResponse, UnCommonForm } from '../../types/api/block';
type Props = {
  ModalProps: ModalProps;
  onClose: () => void;
};
const SkuRegisterModal = ({ ModalProps, onClose }: Props) => {
  const { blockDetail } = useAppSelector((state) => state.blockDetailReducer);
  const { selectedBlockID } = useAppSelector((state) => state.siteReducer);
  const [getAttributes, {}] = useGetAttributesByProductClassificationMutation();
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);
  const [attributes, setAttributes] = useState<{ common: Attributes[]; uncommon: Attributes[] }>({
    common: [],
    uncommon: []
  });
  const products = useRef<SheetRow[]>();
  const [saveSkuMutation, { isLoading }] = useRegisterSkuMutation();

  //閲覧しているブロックが変更されるたび項目の変更
  useEffect(() => {
    console.log(blockDetail);
    if (!blockDetail) return;
    getAttributes(blockDetail.pclId).then((res: any) => {
      if (res.error) return;
      const response = res.data as AttributeWithClassificationResponse;
      const attributeArray = response.data;
      setAttributes({
        common: updateAttributes(attributeArray, true),
        uncommon: updateAttributes(attributeArray, false)
      });
    });
  }, [blockDetail]);

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  const handleSpreadSheet = (rows: SheetRow[]) => {
    if (!rows) return;
    let array: any[][] = [];
    rows.forEach((row, rowIndex) => {
      console.log(row[0]);
      if (!row[0]) return;
      if (!row[0].value) return;
      if (row[0].value) {
        array.push(row);
      }
    });
    products.current = array;
  };
  const handleSave = () => {
    const requestProducts: UnCommonForm = products.current.map((product, i) => {
      return {
        M_PRICE_INC: null,
        M_TAX: null,
        NAME: null,
        NOTE: '',
        PRD_CD: product[0].value, //atode
        pcl_datas: attributes.uncommon.map((attribute, j) => {
          return {
            cd: attribute.cd,
            name: attribute.name,
            unit: '',
            val: product[j].value
          };
        })
      };
    });
    const request: RegisterSkuRequest = {
      body: {
        product_classification_code: blockDetail.pclId,
        series: blockDetail.id,
        products: requestProducts
      }
    };

    saveSkuMutation(request).then((res: any) => {
      if (res.error) return;
      const response = res.data as RegisterSkuResponse;
      message.success('SKUが正常に登録されました。');
      onClose();
    });
  };
  return (
    <>
      <Modal
        width={screenSize.x * 0.5}
        {...ModalProps}
        onOk={() => handleSave()}
        title={'SKUの登録'}
      >
        <div className=" mb-10">
          <h4>共通項目</h4>
          <div>
            {attributes.common.length > 0 ? (
              attributes.common?.map((item, i) => {
                return (
                  <Space className="flex ml-5 ">
                    <div className="w-[150px]">{item.name}</div>
                    <div className="">:</div>
                    <div className="flex justify-center">
                      {item.value === '' ? '未入力' : item.value}
                    </div>
                  </Space>
                );
              })
            ) : (
              <div>共通項目はありません</div>
            )}
          </div>
        </div>
        <SpreadSheet
          uncommonAttributes={attributes.uncommon}
          SelectedData={(e) => handleSpreadSheet(e)}
        ></SpreadSheet>
      </Modal>
    </>
  );
};

export default SkuRegisterModal;
const updateAttributes = (
  attributeArray: AttributeWithClassificationResponse['data'],
  isCommon: boolean
) => {
  return attributeArray
    .filter((item) => item.is_common === (isCommon ? '1' : '0'))
    .map((item) => {
      return {
        id: item.id,
        cd: item.attribute_id,
        name: item.name,
        alterName: item.alternative_name,
        controlType: item.control_type,
        defaultValue: item.default_value,
        selectList: item.select_list ? convertStringOptionToArray(item.select_list) : [],
        value: isCommon ? (item.control_type === INPUT_TYPES.CHECKBOX_INPUT ? '0' : '') : ''
      };
    });
};

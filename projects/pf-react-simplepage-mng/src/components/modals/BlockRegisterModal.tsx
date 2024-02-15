import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  InputProps,
  List,
  Modal,
  ModalProps,
  Radio,
  Select,
  SelectProps,
  Space,
  message
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import SpreadSheet from '../datadisplay/SpreadSheet';
import { DiffOutlined } from '@ant-design/icons';
import { useGetproductClassificationsQuery } from '../../services/productClassificationsApi';
import { useGetAttributesByProductClassificationMutation } from '../../services/attributesApi';
import { AttributeWithClassificationResponse } from '../../types/api/attributes';
import { Attributes } from '../../types/app/attributes';
import { useAppSelector } from '../../store/store';
import { SheetRow } from '../../types/app/spreadsheet';
import { useRegisterCategoriesMutation } from '../../services/categoriesApi';
import { INPUT_TYPES } from '../../utils/constant';
import TextArea from 'antd/es/input/TextArea';
import { convertStringOptionToArray } from '../../utils/utils';
import { useGetResisterDlSheetMutation, useRegisterBlockMutation } from '../../services/blockApi';
import { RegisterBlockRequest, RegisterBlockResponse } from '../../types/api/block';

type Props = {
  ModalProps: ModalProps;
  onClose: () => void;
};

const BlockRegisterModal = ({ ModalProps, onClose }: Props) => {
  const { data: productClassificationsData, isSuccess } = useGetproductClassificationsQuery();
  const [classificationOption, setclassificationOption] = useState<SelectProps['options']>([]);
  const [getAttributes, {}] = useGetAttributesByProductClassificationMutation();
  const [attributes, setAttributes] = useState<{ common: Attributes[]; uncommon: Attributes[] }>({
    common: [],
    uncommon: []
  });
  const products = useRef<SheetRow[]>();
  const [isSelected, setisSelected] = useState(false);
  const SheetData = useRef<SheetRow[]>();
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);
  const [selectedPcl, setselectedPcl] = useState<string>();
  const [registerBlockMutation, { isLoading }] = useRegisterBlockMutation();
  const [blockName, setblockName] = useState<string>();
  const [download, {}] = useGetResisterDlSheetMutation();
  useEffect(() => {
    if (!isSuccess) return;
    const classificationArray = productClassificationsData.data;
    setclassificationOption(
      classificationArray.map((item, i) => {
        return {
          value: item.cd,
          label: item.name
        };
      })
    );
  }, [productClassificationsData]);

  const handleSelect = async (classificationCd: string) => {
    setisSelected(true);
    setselectedPcl(classificationCd);
    getAttributes(classificationCd).then((res: any) => {
      if (res.error) return;
      const response = res.data as AttributeWithClassificationResponse;
      const attributeArray = response.data;
      setAttributes({
        common: updateAttributes(attributeArray, true),
        uncommon: updateAttributes(attributeArray, false)
      });
    });
  };

  const saveBlock = () => {
    console.log(products.current);

    console.log(attributes.uncommon);

    if (!selectedPcl) return;
    if (!attributes.common) return;
    console.log(blockName);
    if (!blockName) return;

    const request: RegisterBlockRequest = {
      body: {
        series: blockName,
        product_classification_code: selectedPcl,
        ucomform: products.current.map((product, i) => {
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
        }),
        comform: {
          note: '',
          pcl_datas: attributes.common.map((item, i) => {
            return {
              cd: item.cd,
              name: item.name,
              unit: '',
              val: item.value
            };
          })
        }
      }
    };

    registerBlockMutation(request).then((res: any) => {
      if (res.error) return;
      const response = res.data as RegisterBlockResponse;
      if (response.result !== 'success') return;
      console.log(response);
      message.success('ブロックが正常に保存されました。');
      onClose();
    });
  };

  const handleSave = () => {
    saveBlock();
  };

  const handleSpreadSheet = (rows: SheetRow[]) => {
    console.log(';lk');
    console.log(rows);
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
    console.log(array);
  };

  const handleDownload = () => {
    const selectedName = classificationOption.filter((item, i) => item.value === selectedPcl)[0]
      .label;

    const request = {
      pclName: selectedName,
      body: {
        productClassification: {
          attribute_count: 6,
          cd: '01HMFN1DNTQ41XSSNXFA0G70KN',
          created_at: '2024-01-19T10:23:20',
          created_by: 'pim_test01@profield.jp',
          is_deleted: '0',
          name: '商品分類名変更',
          product_count: 38
        }
      }
    };
    download(request).then((res: any) => {
      if (res.error) return;
      console.log(res.data.data);
    });
  };

  const handleCommonInput = (value: string, changedIndex: number) => {
    setAttributes((prevState) => ({
      ...prevState,
      common: prevState.common.map((item, i) => (i === changedIndex ? { ...item, value } : item))
    }));
  };
  return (
    <Modal
      onOk={() => handleSave()}
      width={screenSize.x * 0.8}
      className=""
      title={'新ブロック登録'}
      {...ModalProps}
    >
      <div style={{ maxHeight: screenSize.y * 0.75 }} className="overflow-auto">
        <div>
          <h2>ブロック名</h2>
          <Input
            value={blockName}
            onChange={(e) => setblockName(e.target.value)}
            className=" w-1/2 -mt-20"
          ></Input>
        </div>
        <div className=" mt-6 ">
          <Space>
            <h2>共通項目の設定</h2>
            <Select
              className=" w-[200px]"
              onChange={handleSelect}
              placeholder={'商品分類を選択'}
              options={classificationOption}
            ></Select>
            <Button
              type="primary"
              disabled={selectedPcl ? false : true}
              onClick={() => handleDownload()}
            >
              登録シートのダウンロード
            </Button>
          </Space>

          {isSelected ? (
            attributes?.common.length > 0 ? (
              <div>
                {attributes?.common.map((item, i) => (
                  <>
                    {item.controlType === INPUT_TYPES.SINGLE_LINE && (
                      <>
                        <div>{item.name}</div>
                        <Input onChange={(e) => handleCommonInput(e.target.value, i)}></Input>
                      </>
                    )}
                    {item.controlType === INPUT_TYPES.MULTI_LINE && (
                      <>
                        <div>{item.name}</div>
                        <TextArea
                          onChange={(e) => handleCommonInput(e.target.value, i)}
                          title={item.name}
                        ></TextArea>
                      </>
                    )}
                    {item.controlType === INPUT_TYPES.CHECKBOX_INPUT && (
                      <>
                        <div>{item.name}</div>
                        <Checkbox
                          checked={item.value === '0' ? false : true}
                          onChange={(e) => handleCommonInput(e.target.checked ? '1' : '0', i)}
                          title={item.name}
                        ></Checkbox>
                      </>
                    )}
                    {item.controlType === INPUT_TYPES.RADIO_INPUT && (
                      <>
                        <div>{item.name}</div>
                        <Radio.Group
                          onChange={(e) => handleCommonInput(e.target.value, i)}
                          value={item.value}
                        >
                          {item.selectList.map((option, index) => {
                            if (option !== '') {
                              return (
                                <Radio key={index} value={option}>
                                  {option}
                                </Radio>
                              );
                            }
                          })}
                        </Radio.Group>{' '}
                      </>
                    )}
                    {item.controlType === INPUT_TYPES.COMBO_INPUT && (
                      <>
                        <div>{item.name}</div>
                        <Select
                          className=" min-w-[200px]"
                          showSearch
                          onChange={(e) => handleCommonInput(e, i)}
                          options={item.selectList.map((option) => {
                            return { value: option, label: option };
                          })}
                        ></Select>
                      </>
                    )}

                    {item.controlType === INPUT_TYPES.NUMBER_INPUT && (
                      <>
                        <div>{item.name}</div>
                        <InputNumber
                          onChange={(e) => handleCommonInput(e.toString(), i)}
                          style={{ width: '100%' }}
                        />
                      </>
                    )}

                    {item.controlType === INPUT_TYPES.DATE_INPUT && (
                      <>
                        <div>{item.name}</div>
                        <DatePicker
                          onChange={(e, d) =>
                            handleCommonInput(typeof d === 'string' ? d.replace(/-/g, ';') : '', i)
                          }
                          style={{ width: '100%' }}
                        />
                      </>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <h5>共通項目はありません</h5>
            )
          ) : (
            <h5>商品分類を選択してください</h5>
          )}
        </div>

        <div>
          <h2>商品の追加</h2>
          <SpreadSheet
            uncommonAttributes={attributes.uncommon}
            SelectedData={(e) => handleSpreadSheet(e)}
          ></SpreadSheet>
        </div>
      </div>
    </Modal>
  );
};

export default BlockRegisterModal;

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

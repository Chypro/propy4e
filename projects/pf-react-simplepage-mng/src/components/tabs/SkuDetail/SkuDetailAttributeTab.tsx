import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { INPUT_TYPES } from '../../../utils/constant';
import TextArea from 'antd/es/input/TextArea';
import { updateAttribute } from '../../../features/skuDetailSlice';

const SkuDetailAttributeTab = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  enum AttrDisplayEnum {
    all = '0',
    common = '1',
    private = '2'
  }

  const options = [
    {
      value: AttrDisplayEnum.all,
      label: '全ての項目'
    },
    {
      value: AttrDisplayEnum.common,
      label: '共通項目'
    },
    {
      value: AttrDisplayEnum.private,
      label: '固有項目'
    }
  ];

  const dispatch = useAppDispatch();
  const { skuDetail } = useAppSelector((state) => state.skuDetailReducer);

  const [selectOption, setSelectOption] = useState<AttrDisplayEnum>(AttrDisplayEnum.all);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleSelect = (value: string) => {
    setSelectOption(value as AttrDisplayEnum);
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <Select
        style={{ width: 200, marginBottom: 10 }}
        options={options}
        defaultValue={'0'}
        onChange={handleSelect}
      />
      <Form layout="vertical">
        {skuDetail?.attributes?.map((attr, i) => {
          if (selectOption === AttrDisplayEnum.common) {
            if (!attr.isCommon) return;
          } else if (selectOption === AttrDisplayEnum.private) {
            if (attr.isCommon) return;
          }
          return (
            <Form.Item key={attr.id} label={attr.name} required={attr.require}>
              <Space.Compact style={{ width: '100%' }}>
                {/*text input */}
                {attr.type === INPUT_TYPES.SINGLE_LINE && (
                  <>
                    <Input
                      onChange={(e) =>
                        dispatch(updateAttribute({ index: i, value: e.target.value }))
                      }
                      value={attr.value}
                      defaultValue={attr.defaultValue}
                    ></Input>
                  </>
                )}

                {/* textarea input */}
                {attr.type === INPUT_TYPES.MULTI_LINE && (
                  <TextArea
                    onChange={(e) => dispatch(updateAttribute({ index: i, value: e.target.value }))}
                    value={attr.value}
                    defaultValue={attr.defaultValue}
                    rows={4}
                  />
                )}

                {/* radio input */}
                {attr.type === INPUT_TYPES.RADIO_INPUT && (
                  <Radio.Group
                    onChange={(e) => dispatch(updateAttribute({ index: i, value: e.target.value }))}
                    value={attr.value}
                  >
                    {attr.options.map((option, index) => {
                      if (option !== '') {
                        return (
                          <Radio key={index} value={option}>
                            {option}
                          </Radio>
                        );
                      }
                    })}
                  </Radio.Group>
                )}

                {/* combo input */}
                {attr.type === INPUT_TYPES.COMBO_INPUT && (
                  <Select
                    showSearch
                    options={attr.options.map((option) => {
                      return { value: option, label: option };
                    })}
                    onChange={(e) => dispatch(updateAttribute({ index: i, value: e.target.value }))}
                  ></Select>
                )}

                {/* number input */}
                {attr.type === INPUT_TYPES.NUMBER_INPUT && (
                  <InputNumber
                    onChange={(e) => dispatch(updateAttribute({ index: i, value: e.toString() }))}
                    style={{ width: '100%' }}
                    defaultValue={parseFloat(attr.defaultValue)}
                  />
                )}

                {/* check input */}
                {attr.type === INPUT_TYPES.CHECKBOX_INPUT && (
                  <Checkbox
                    onChange={(e) =>
                      dispatch(updateAttribute({ index: i, value: e.target.checked ? '1' : '0' }))
                    }
                    defaultChecked={attr.defaultValue === '1'}
                  />
                )}

                {/* date input */}
                {attr.type === INPUT_TYPES.DATE_INPUT && <DatePicker style={{ width: '100%' }} />}

                {attr.isWithUnit && <Input style={{ width: '10%' }} value={attr.units}></Input>}
              </Space.Compact>
            </Form.Item>
          );
        })}
        {!skuDetail?.attributes.length && (
          <div className=" mt-10 ml-10">共通項目はありません。</div>
        )}
      </Form>
    </div>
  );
};

export default SkuDetailAttributeTab;

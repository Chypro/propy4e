import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Space } from 'antd';
import { INPUT_TYPES } from '../../../utils/constant';
import TextArea from 'antd/es/input/TextArea';
import { updateAttribute } from '../../../features/blockDetailSlice';
import { PclData } from '../../../types/api/block';
import { setBlockUpdatePclData } from '../../../features/blockUpdateValueSlice';

const BlockDetailAttributesTab = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { blockDetail } = useAppSelector((state) => state.blockDetailReducer);
  const dispatch = useAppDispatch();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  useEffect(() => {
    const newPclDatas: PclData[] = blockDetail.attributes.map((attr, i) => {
      console.log(attr.units);
      return {
        cd: attr.cd,
        name: attr.name,
        unit: attr.units[0] ?? '',
        val: attr.value
      };
    });
    dispatch(setBlockUpdatePclData(newPclDatas));
  }, [blockDetail?.attributes]);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Form layout="vertical">
      {blockDetail?.attributes?.map((attr, i) => (
        <Form.Item key={attr.id} label={attr.name} required={attr.require}>
          <Space.Compact style={{ width: '100%' }}>
            {/*text input */}
            {attr.type === INPUT_TYPES.SINGLE_LINE && (
              <>
                <Input
                  onChange={(e) => dispatch(updateAttribute({ index: i, value: e.target.value }))}
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
      ))}
      {!blockDetail?.attributes.length && (
        <div className=" mt-10 ml-10">共通項目はありません。</div>
      )}
    </Form>
  );
};

export default BlockDetailAttributesTab;

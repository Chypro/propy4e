import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Checkbox, Select, ModalProps, message } from 'antd';
import { UpdateAttributesBody } from '../../../../types/api/attributes';
import {
  updateValueRequestType,
  updateValueType,
  useUpdateAttributeMutation
} from '../../../../services/attributesApi';

interface EditItemModalProps {
  data: UpdateAttributesBody;
  ModalProps: ModalProps;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ data, ModalProps }) => {
  const [form] = Form.useForm();
  const [updateAttribute, { isSuccess }] = useUpdateAttributeMutation();
  // 初期値を設定
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);
  const modal = Modal.info;
  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values.not_null = values.not_null ? 1 : 0;
      values.is_with_unit = values.is_with_unit ? 1 : 0;
      values.is_private = values.is_private ? 1 : 0;

      // select_listとmax_lengthの値を追加
      if (!('select_list' in values)) {
        values.select_list = ''; // もしselect_listが含まれていない場合、nullを追加
      }
      if (!('max_length' in values)) {
        values.max_length = null; // もしmax_lengthが含まれていない場合、nullを追加
      }

      // data.cdをvaluesと結合してonEditItemに渡す
      const editedData: updateValueType = { ...values };
      const request: updateValueRequestType = {
        body: editedData,
        attributeCd: data.cd
      };
      console.log(editedData);
      updateAttribute(request).then((res: any) => {
        if (res.error) return;
        const response = res.data;
        console.log(response);
        message.success('項目の更新が成功しました。');
      });
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const [controlType, setControlType] = useState(null);

  const handleControlTypeChange = (value) => {
    setControlType(value);
    console.log('コントロールタイプ', controlType);
  };

  return (
    <>
      {
        <Modal title="商品固有項目 入力設定" onOk={handleOk} {...ModalProps} destroyOnClose>
          <div className="overflow-auto max-h-[300px]">
            <div>商品固有項目の入力設定ができます。</div>
            <div>
              <p>商品属性コード: {data?.cd}</p>
              <p>商品属性項目名: {data?.name}</p>
            </div>
            <Form className=" " form={form} layout="vertical">
              <Form.Item
                label=""
                name="not_null"
                valuePropName="checked"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <span>必須入力</span>
                <Checkbox style={{ marginLeft: '8px' }} />
              </Form.Item>
              <Form.Item
                label=""
                name="is_with_unit"
                valuePropName="checked"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <span>単位あり</span>
                <Checkbox style={{ marginLeft: '8px' }} />
              </Form.Item>
              <Form.Item
                label=""
                name="is_private"
                valuePropName="checked"
                initialValue={true}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <span>プライベート項目</span>
                <Checkbox style={{ marginLeft: '8px' }} />
              </Form.Item>

              <Form.Item
                label="項目表示名"
                name="alternative_name"
                rules={[{ required: true, message: '項目名を入力してください' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="入力コントロール" name="control_type">
                <Select placeholder="Select an option" onChange={handleControlTypeChange}>
                  <Select.Option value="0">単数行テキスト</Select.Option>
                  <Select.Option value="1">複数行テキスト</Select.Option>
                  <Select.Option value="2">コンボ選択</Select.Option>
                  <Select.Option value="3">チェック選択</Select.Option>
                  <Select.Option value="4">数値</Select.Option>
                  <Select.Option value="5">日付</Select.Option>
                </Select>
              </Form.Item>

              {controlType === '0' && (
                <Form.Item label="行数" name="max_length">
                  <Input type="number" />
                </Form.Item>
              )}

              {controlType === '1' && (
                <Form.Item label="行数" name="max_length">
                  <Input type="number" />
                </Form.Item>
              )}

              {controlType === '2' && (
                <Form.Item label="選択候補" name="select_list">
                  <Input />
                </Form.Item>
              )}

              {controlType === '3' && null}

              {controlType === '4' && (
                <Form.Item label="最大文字数" name="max_length">
                  <Input />
                </Form.Item>
              )}

              {controlType === '5' && null}

              <Form.Item label="デフォルト属性値" name="defult_value">
                <Input />
              </Form.Item>

              <Form.Item label="デフォルト属性単位" name="unit">
                <Input />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      }
    </>
  );
};

export default EditItemModal;

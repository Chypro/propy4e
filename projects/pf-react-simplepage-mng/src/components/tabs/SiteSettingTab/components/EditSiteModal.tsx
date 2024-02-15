import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { getSiteListResponseData } from '../../../../types/api/site';

interface EditSiteModalProps {
  visible: boolean;
  data: getSiteListResponseData;
  onClose: (val: boolean) => void;
  onEditSite: (data: getSiteListResponseData, code: string) => void;
}

const EditSiteModal = ({ visible, data, onClose, onEditSite }: EditSiteModalProps) => {
  const [form] = Form.useForm();
  // 初期値を設定
  form.setFieldsValue(data);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onEditSite(values, data.cd);
      console.log("update site values:>>", values);
      onClose(false);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Modal title="サイト編集" open={visible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
      <Form form={form} layout="vertical">
        <Form.Item
          label="サイト名"
          name="name"
          rules={[{ required: true, message: 'サイト名を入力してください' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="サイト説明"
          name="explan"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSiteModal;
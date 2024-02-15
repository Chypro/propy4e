import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { createSiteBodyType } from '../../../../services/sitesApi';

interface NewSiteModalProps {
  visible: boolean;
  onClose: (val: boolean) => void;
  onAddSite: (data: createSiteBodyType) => void;
}

const NewSiteModal = ({ visible, onClose, onAddSite }: NewSiteModalProps) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      Object.keys(values).forEach(key => {
        if (values[key] === undefined) {
          values[key] = '';
        }
      });
      onAddSite(values);
      console.log("add site values:>>", values);
      onClose(false);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Modal title="サイト作成" open={visible} onOk={handleOk} onCancel={handleCancel} okText="保存" cancelText="キャンセル" destroyOnClose>
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

export default NewSiteModal;
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Checkbox, Table, Space, ModalProps, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RiDeleteBackFill } from 'react-icons/ri';
import {
  RegisterAttributeBody,
  RegisterAttributeRequest,
  useRegisterAttributeMutation
} from '../../../../services/attributesApi';

interface NewItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAddItem: (data: { 項目名: string; 単位: boolean }) => void;
  ModalProps?: ModalProps;
}

const NewItemModal: React.FC<NewItemModalProps> = ({ visible, onClose, onAddItem, ModalProps }) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<{ key: React.Key; 項目名: string; 単位: boolean }[]>(
    [{ key: '0', 項目名: '', 単位: false }]
  );
  const [registerAttribute, {}] = useRegisterAttributeMutation();
  const columns = [
    {
      title: '項目名',
      dataIndex: '項目名',
      key: '項目名',
      render: (text: string, record: { key: React.Key }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Form.Item
            name={['items', String(record.key), '項目名']}
            fieldKey={['items', record.key, '項目名']}
            rules={[{ required: true, message: '項目名を入力してください' }]}
            style={{ margin: 0 }}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </div>
      )
    },
    {
      title: '単位',
      dataIndex: '単位',
      key: '単位',
      render: (text: boolean, record: { key: React.Key }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Form.Item
            name={['items', String(record.key), '単位']}
            fieldKey={['items', record.key, '単位']}
            valuePropName="checked"
            style={{ margin: 0 }}
          >
            <Checkbox />
          </Form.Item>
        </div>
      )
    },
    {
      title: '',
      dataIndex: '操作',
      key: '操作',
      render: (text: string, record: { key: React.Key }) =>
        dataSource.length > 0 ? (
          <Button
            type="link"
            onClick={() => handleRemove(record.key)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <RiDeleteBackFill />
          </Button>
        ) : null
    }
  ];

  const handleAddField = () => {
    const newKey = (dataSource.length + 1).toString();
    setDataSource([...dataSource, { key: newKey, 項目名: '', 単位: false }]);
  };

  const handleRemove = (key: React.Key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const valuesArray = Object.values(values.items);
      const requestBody: RegisterAttributeBody = valuesArray.map((value, i) => {
        return {
          name: value['項目名'],
          with_unit: value['単位'] ? 1 : 0
        };
      });
      const request: RegisterAttributeRequest = {
        body: requestBody
      };
      registerAttribute(request).then((res: any) => {
        if (res.error) return;
        console.log(res);
        message.success('項目が正常に登録されました。');
        onClose();
      });
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="新規項目追加"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      {...ModalProps}
    >
      <Form form={form} layout="vertical" initialValues={{ items: dataSource }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.key}
          footer={() => (
            <Button
              type="dashed"
              onClick={handleAddField}
              icon={<PlusOutlined />}
              style={{ width: '100%' }}
            >
              新しい項目追加
            </Button>
          )}
        />
      </Form>
    </Modal>
  );
};

export default NewItemModal;

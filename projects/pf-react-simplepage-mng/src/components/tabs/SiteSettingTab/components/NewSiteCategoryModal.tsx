import React from 'react';
import { Modal, Form, Input, Button, Flex, Space } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons' 
import { createSiteCategoryBodyType } from '../../../../services/sitesApi';
import { useAppSelector } from '../../../../store/store';

interface NewSiteCategoryModalProps {
  visible: boolean;
  categoryName: string;
  onClose: (val: boolean) => void;
  onAddSiteCategory: (data: createSiteCategoryBodyType) => void;
}

const NewSiteCategoryModal = ({ visible, categoryName, onClose, onAddSiteCategory }: NewSiteCategoryModalProps) => {
  const themeColor = useAppSelector((state) => state.persist.themeReducer.themeColor);
  const [form] = Form.useForm();
  const categoryText = <span style={{color: themeColor.blue[600]}}>{categoryName ? categoryName : "ルートカテゴリ"}</span>;

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onAddSiteCategory(values);
      onClose(false);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Modal title={<div>{categoryText}にカテゴリを追加</div>} 
      open={visible} onOk={handleOk} onCancel={handleCancel} destroyOnClose okText="保存" cancelText="キャンセル">
      <Form form={form} layout="vertical">
        <p>カテゴリ名を登録して追加が出来ます</p>
        <Form.List name="categories" initialValue={[""]}>
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? 'カテゴリ名' : ''}
                  required={true}
                  key={field.key}
                >
                  <Flex gap='small'>
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          required: true,
                          message: "カテゴリ名を入力してください",
                        },
                      ]}
                      noStyle
                      >
                      <Input />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <CloseOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                      />
                      ) : null}
                  </Flex>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '100%' }}
                  icon={<PlusOutlined />}
                >
                  新しいカテゴリを追加
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default NewSiteCategoryModal;
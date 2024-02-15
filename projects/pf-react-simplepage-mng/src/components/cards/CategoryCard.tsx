import React from 'react';
import { Card, Form, Input, Button, Flex, Space } from 'antd';
import CustomImage from '../datadisplay/CustomImage';
interface CategoryListProps {
  title: string;
  key: React.Key;
  img: string;
  note: string;
  img_mobile?: string;
}
type Props = {
  selectedCategory: CategoryListProps;
};
const CategoryCard = ({ selectedCategory }: Props) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { TextArea } = Input;
  const [form] = Form.useForm();
  form.setFieldsValue(selectedCategory);

  const handleEditCategoryDetail = (data: any) => {};

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      handleEditCategoryDetail(values);
      console.log('update site values:>>', values);
      //onClose(false);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Card title="カテゴリ">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item<string> label="カテゴリ名" name="title">
          <Input />
        </Form.Item>
        {'img_mobile' in selectedCategory ? (
          <Flex gap={'large'}>
            <Form.Item label="カテゴリ画像">
              <CustomImage
                URL={selectedCategory.img}
                ImageProps={{ width: '50%', style: { width: 200, height: 200 } }}
              />
            </Form.Item>
            <Form.Item label="カテゴリ画像（モバイル）">
              <CustomImage
                URL={selectedCategory.img_mobile}
                ImageProps={{ width: '50%', style: { width: 200, height: 200 } }}
              />
            </Form.Item>
          </Flex>
        ) : (
          <Form.Item label="カテゴリ画像">
            <CustomImage
              URL={selectedCategory.img}
              ImageProps={{ width: '50%', style: { width: 200, height: 200 } }}
            />
          </Form.Item>
        )}
        <Form.Item<string> label="カテゴリ説明" name="note">
          <TextArea style={{ resize: 'none' }} rows={5}>
            <Input />
          </TextArea>
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" block>
            変更内容を保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CategoryCard;

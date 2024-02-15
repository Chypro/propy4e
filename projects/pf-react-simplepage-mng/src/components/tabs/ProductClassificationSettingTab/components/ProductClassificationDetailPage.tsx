import React, { useState } from 'react'
import { Flex, Space, Button, Form, Input, TableProps, TabsProps, Tabs, Row, Col } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { AttributesTab, ProductsTab } from '..';

type Props = {
  setDetailPage: () => void;
  clickProductClassification: TableProps;
};
const AttributesListPage = ({setDetailPage, clickProductClassification}: Props) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [form] = Form.useForm();
  form.setFieldsValue({name: clickProductClassification['商品分類名']});

  enum ProductClassidicationDetailTabEnum {
    attribute = '1',
    product = '2',
  }

  const items: TabsProps['items'] = [
    {
      key: ProductClassidicationDetailTabEnum.attribute,
      label: `項目(${clickProductClassification['項目数']})`,
      children: <AttributesTab classificationCode={clickProductClassification['コード']}/>
    },
    {
      key: ProductClassidicationDetailTabEnum.product,
      label: `商品(${clickProductClassification['商品数']})`,
      children: <ProductsTab />
    }
  ];
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      {/* title */}
      <Flex>
        <Space>
          <Button type='text' onClick={setDetailPage} icon={<DoubleLeftOutlined />}/>
          <Form form={form} layout="vertical">
            <Row align="bottom" gutter={[10, 10]}>
              <Col>
                <Form.Item
                  label="商品分類"
                  name="name"
                  rules={[{ required: true, message: '商品分類名を入力してください' }]}
                  >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type='primary'>保存</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Space>
      </Flex>

      {/* tabs */}
      <Tabs size="large" items={items}/>

    </div>
  )
};

export default AttributesListPage;

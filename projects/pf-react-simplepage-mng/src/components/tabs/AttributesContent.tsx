import { ConfigProvider, Form, Input, List } from 'antd';
import React from 'react';
import AllAttributes from '../../data/attributes';

const AttributesContent = () => {
  return (
    <div className="px-6">
      <ConfigProvider
        theme={{
          components: {
            List: {
              colorSplit: 'rgba(255, 0, 0, 0)'
            }
          }
        }}
      >
        <List
          className=" mt-5"
          itemLayout="horizontal"
          dataSource={AllAttributes}
          renderItem={(item, i) => (
            <List.Item style={{ height: '45px' }}>
              <Form.Item label={item.name} className="w-full">
                <Input defaultValue={'400円'} size="small"></Input>
              </Form.Item>
            </List.Item>
          )}
        ></List>
      </ConfigProvider>
    </div>
  );
};

export default AttributesContent;

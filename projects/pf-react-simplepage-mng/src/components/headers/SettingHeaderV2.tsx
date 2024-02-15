import React, { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { Button, Input, Space, Select, Form } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
  settingHeaderText: string;
  setSearchTerm: (val: string) => void;
  setIsModalVisible: (val: boolean) => void;
  handleChange?: (val: string) => void;
  handleVisible?: () => void;
}

const SettingHeaderV2 = ({ settingHeaderText, setSearchTerm, setIsModalVisible, handleChange, handleVisible }: Props) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const themeColor = useAppSelector((state) => state.persist.themeReducer.themeColor);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <div className="flex justify-between pb-5">
        <Button icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>{settingHeaderText + "の追加"}</Button>
        <Space>
          {handleChange && (
            <>
            <Select defaultValue="all" style={{ width: 120 }} onChange={(value) => handleChange(value)}>
              <Select.Option value="all">全て</Select.Option>
              <Select.Option value="0">表示項目</Select.Option>
              <Select.Option value="1">非表示項目</Select.Option>
            </Select>
            <Button style={{backgroundColor: themeColor.red[500], color: 'white'}} onClick={() => handleVisible()}>非表示にする</Button>
            </>
          )}          
          <Input
            className="md:w-64"
            addonBefore={<SearchOutlined />}
            placeholder={settingHeaderText + "の検索"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
        </Space>
      </div>
    </div>
  );
}

export default SettingHeaderV2;
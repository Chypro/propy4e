import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
  settingHeaderText: string;
  isDeleteDisabled: boolean;
  setSearchTerm: (val: string) => void;
  setIsModalVisible: (val: boolean) => void;
  onDelete: () => void;
}

const SettingHeader = ({ settingHeaderText, isDeleteDisabled, setSearchTerm, setIsModalVisible, onDelete }: Props) => {
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <div className="flex justify-between pb-5">
        <div className="flex items-center">
          <Space>
            <Button icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>{settingHeaderText + "の追加"}</Button>
            <Button icon={<DeleteOutlined />} onClick={onDelete} disabled={isDeleteDisabled}>
              削除
            </Button>
          </Space>
        </div>
        <Input
          className="md:w-64"
          addonBefore={<SearchOutlined />}
          placeholder={settingHeaderText + "の検索"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SettingHeader;

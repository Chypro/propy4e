import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
  isDeleteDisabled: boolean;
  setSearchTerm: (val: string) => void;
  setIsNewSiteModalVisible: (val: boolean) => void;
  onDeleteSites: () => void;
}

const SiteSettingHeader = ({ isDeleteDisabled, setSearchTerm, setIsNewSiteModalVisible, onDeleteSites }: Props) => {
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <div className="flex justify-between pb-5">
        <div className="flex items-center">
          <Space>
            <Button icon={<PlusOutlined />} onClick={() => setIsNewSiteModalVisible(true)}>
              サイトの追加
            </Button>
            <Button icon={<DeleteOutlined />} onClick={onDeleteSites} disabled={isDeleteDisabled}>
              削除
            </Button>
          </Space>
        </div>
        <Input
          className="md:w-64"
          addonBefore={<SearchOutlined />}
          placeholder="サイトの検索"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SiteSettingHeader;

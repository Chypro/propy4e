import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';

interface ItemSettingHeaderProps {
  onSearch: (value: string) => void;
  onAddItem: () => void;
  onDeleteItems: () => void;
}

const ItemSettingHeader: React.FC<ItemSettingHeaderProps> = ({
  onSearch,
  onAddItem,
  onDeleteItems
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div>
      <div className="flex justify-between pb-5">
        <div className="flex items-center">
          <Space>
            <Button icon={<PlusOutlined />} onClick={onAddItem}>
              項目の追加
            </Button>
            <Button icon={<DeleteOutlined />} onClick={onDeleteItems}>
              削除
            </Button>
          </Space>
        </div>
        <Input
          className="md:w-64"
          addonBefore={<SearchOutlined />}
          placeholder="項目の検索"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default ItemSettingHeader;
import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

interface LabelSettingHeaderProps {
  onSearch: (value: string) => void;
  onAddLabel: () => void;
}

const LabelSettingHeader: React.FC<LabelSettingHeaderProps> = ({
  onSearch,
  onAddLabel,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div>
      <div className="flex justify-between pb-5">
        <div className="flex items-center">
          <Space>
            <Button icon={<PlusOutlined />} onClick={onAddLabel}>
              ラベルの追加
            </Button>
          </Space>
        </div>
        <Input
          className="md:w-64"
          addonBefore={<SearchOutlined />}
          placeholder="ラベルの検索"
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

export default LabelSettingHeader;
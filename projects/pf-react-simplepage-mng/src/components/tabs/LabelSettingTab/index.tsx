import React, { useEffect, useState } from 'react';
import LabelSettingHeader from './components/LabelSettingHeader';
import LabelField from './components/LabelField';
import { useGetLablesLIstQuery, useUpdateLablesMutation } from '../../../services/lablesApi';
import { Button, Input, Tabs, TabsProps } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const LabelSettingTab = () => {
  const [filter, setFilter] = useState<string>('');
  const [filteredLabels, setFilteredLabels] = useState<any[]>([]);
  const { data, isError, isLoading, isSuccess } = useGetLablesLIstQuery();
  
  useEffect(() => {
    if (isSuccess) {
      const newLabels = Object.keys(data.data).map(key => {
        const item = data.data[key];
        return {
          key: key,
          id: item.id,
          name: item.name,
          color: item.color
        };
      });
      const filtered =
        filter.trim() === ''
          ? newLabels
          : newLabels.filter(
              (item) => item['name'].includes(filter)
            );

      setFilteredLabels(filtered);
    }
  }, [data, filter]);
  
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState<{ key: string; name: string; id: number; color: string } | null>(null);

  const handleItemClick = (key: string, name: string, id: number, color: string) => {
    setEditItem({ key, name, id, color });
    setEditMode(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editItem) {
      setEditItem({ ...editItem, name: e.target.value });
    }
  };

  const handleEditSave = () => {
    // 編集保存のロジックをここに追加
    setEditMode(false);
  };

  const handleSearch = (value: string) => {
    setFilter(value);
  };

  const handleAddLabel = () => {
    // 新規項目の追加処理を行う（データの保存など）
    console.log('新規項目の追加:');
    // ここで新規項目を追加するためのロジックを実装
  };

  const handleDeleteLabel = (deletedItemKey: string) => {
    // ラベルの削除処理を行う
    console.log('削除されたアイテムのキー:', deletedItemKey);
    // ここでonDeleteシグナルを発生させるなどの削除処理を実装
  }

  const handleEditLabel = () => {
    // ラベルの編集処理を行う
    console.log('ラベルの編集処理:');
    // ここでonEditシグナルを発生させるなどの編集処理を実装
  }
  
  return (
    <div>
      <LabelSettingHeader onSearch={handleSearch} onAddLabel={handleAddLabel}/>
      <LabelField data={filteredLabels} onDelete={handleDeleteLabel} onEdit={handleEditLabel} />
      {editMode && (
        <div>
          <button onClick={handleEditSave}>保存</button>
        </div>
      )}
    </div>
  );
};

export default LabelSettingTab;

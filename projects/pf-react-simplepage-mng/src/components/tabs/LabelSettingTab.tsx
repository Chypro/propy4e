import React, { useEffect, useState } from 'react';
import { labelsDami } from '../../data/lables';
import { Button, Input, Tabs, TabsProps } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const LabelSettingTab = () => {
  const newLabels = Object.keys(labelsDami).map((key) => {
    const value = labelsDami[key];
    return {
      key: key,
      id: value.id,
      name: value.name,
      color: value.color
    };
  });

  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState<{
    key: string;
    name: string;
    id: number;
    color: string;
  } | null>(null);

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

  return (
    <div>
      <h1>Labels Page</h1>
      <ul>
        {newLabels.map((item) => (
          <li
            key={item.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #ccc',
              padding: '8px 0',
              cursor: 'pointer'
            }}
            onClick={() => handleItemClick(item.key, item.name, item.id, item.color)}
          >
            <div
              style={{
                backgroundColor: item.color,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                marginRight: '8px'
              }}
            ></div>
            {editMode && editItem?.key === item.key ? (
              <input type="text" value={editItem.name} onChange={handleEditChange} />
            ) : (
              `${item.name} - ${item.id}`
            )}
          </li>
        ))}
      </ul>
      {editMode && (
        <div>
          <button onClick={handleEditSave}>保存</button>
        </div>
      )}
    </div>
  );
};

export default LabelSettingTab;

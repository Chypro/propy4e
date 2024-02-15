import React, { useEffect, useState } from 'react';
import { TiDelete } from "react-icons/ti";

interface LabelFieldProps {
  data: any[];
  onDelete: (deletedItemKey: string) => void;
  onEdit: () => void;
}

const LabelField: React.FC<LabelFieldProps> = ({ data, onDelete, onEdit }) => {
  const [newLabels, setNewLabels] = useState(data.map(value => ({
    key: value.key,
    id: value.id,
    name: value.name,
    color: value.color
  })));
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState<{ key: string; name: string; id: number; color: string } | null>(null);
  const [deletedItems, setDeletedItems] = useState<string[]>([]); // 削除されたアイテムのキーを記録する配列
  const [showSaveButton, setShowSaveButton] = useState(false); // 保存ボタンの表示状態

  // data プロパティが変更されたら、newLabels ステートを更新する
  useEffect(() => {
    setNewLabels(data.map(value => ({
      key: value.key,
      id: value.id,
      name: value.name,
      color: value.color
    })));
  }, [data]);

  const handleItemClick = (key: string, name: string, id: number, color: string) => {
    if (deletedItems.includes(key)) {
      // 削除されたアイテムをクリックした場合は元に戻す
      setDeletedItems(deletedItems.filter(item => item !== key));
    } else {
      setEditItem({ key, name, id, color });
      setEditMode(true);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editItem) {
      setEditItem({ ...editItem, name: e.target.value });
    }
  };

  const handleEditSave = () => {
    // 編集保存のロジックをここに追加
    setEditMode(false);
    setShowSaveButton(false); // 保存ボタンを非表示にする
  };

  const handleDeleteItem = (item) => {
    // 対象のアイテムの key を取得
    const deletedKey = item.key;
    
    if (deletedItems.includes(deletedKey)) {
      // 削除されている場合は削除フラグを解除する
      setDeletedItems(deletedItems.filter(key => key !== deletedKey));
      setShowSaveButton(true);
      onDelete(deletedKey); 
    } else {
      // 削除されていない場合は削除フラグを立てる
      setDeletedItems([...deletedItems, deletedKey]);
      setShowSaveButton(true); 
      
      onDelete(deletedKey); 
    }
  };
  

  return (
    <div style={{ position: 'relative' }}>
      <ul>
        {newLabels.map(item => (
          <li
            key={item.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #ccc',
              padding: '8px 0',
              cursor: 'pointer',
              position: 'relative',
              textDecoration: deletedItems.includes(item.key) ? 'line-through' : 'none', // 削除されたアイテムの場合は横線を引く
              opacity: deletedItems.includes(item.key) ? 0.6 : 1, // 削除されたアイテムの場合は要素を薄くする
            }}
            onClick={() => setEditMode(true)} // 文字をクリックしたら編集モードに切り替える
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div style={{ backgroundColor: item.color, width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }}></div>
            {editMode && editItem?.key === item.key ? (
              <input type="text" value={editItem.name} onChange={handleEditChange} />
            ) : (
              `${item.name}`
            )}
            {hoveredItem === item.key && (
              <button
                style={{ marginLeft: 'auto', visibility: editMode && editItem?.key === item.key ? 'hidden' : 'visible', border: 'none', background: 'none', marginRight: '10px' }}
                onClick={(e) => {
                  e.stopPropagation(); // クリックイベントが親要素に伝播しないようにする
                  handleDeleteItem(item);
                }}
              >
                <TiDelete size={24} />
              </button>
            )}
          </li>
        ))}
      </ul>
      {showSaveButton && (
        <button
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            padding: '8px 16px',
            fontSize: '16px',
            borderRadius: '4px',
            background: '#1890ff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={handleEditSave}
        >
          保存
        </button>
      )}
    </div>
  );
};

export default LabelField;
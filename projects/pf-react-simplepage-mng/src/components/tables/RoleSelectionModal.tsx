import React, { useState, useEffect } from 'react';
import { Modal, Checkbox, Button, Input } from 'antd';

interface UserDateType {
  id: number;
  login: string;
  surname: string;
  givenName: string;
  administator: string;
}

interface RoleSelectionModalProps {
  menuList: string[];
  visible: boolean;
  data: UserDateType;
  onKeep: (result: string) => void;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  menuList,
  visible,
  data,
  onKeep
}) => {
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(menuList.map(() => false));

  const [roleName, setRoleName] = useState<string>('');
  const [filteredMenuList, setFilteredMenuList] = useState<string[]>(menuList);
  const [isModalOpen, setIsModalOpen] = useState(visible);

  useEffect(() => {
    setFilteredMenuList(menuList);
  }, [menuList]);

  const handleCheckboxChange = (itemIndex: number, checked: boolean) => {
    const updatedStates = Array(menuList.length).fill(false);
    updatedStates[itemIndex] = checked;
    setRoleName(menuList[itemIndex]);
    setCheckboxStates(updatedStates);
  };

  const handleSearchChange = (searchValue: string) => {
    const filteredList = menuList.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredMenuList(filteredList);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onKeep('');
  };

  const handleOpenModalClick = () => {
    showModal();
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    onKeep(roleName);
  };

  return (
    <Modal
      //   title="Select Role"
      visible={visible}
      //   onOk={onOk}
      onCancel={handleCancel}
      width={600}
      footer={
        <div>
          <Button onClick={handleCancel} style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Keep</Button>
        </div>
      }
    >
      <div>
        <h2>User Management</h2>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          padding: '10px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
          color: '#1E1F21',
          marginBottom: '2px'
        }}
      >
        <div style={{ padding: '10px' }}>
          <span>Username: {data?.givenName} </span>
        </div>
        <div style={{ padding: '10px' }}>
          <span>Login: {data?.login}</span>
        </div>
        <Input
          placeholder="Search roles..."
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{ marginTop: '10px', marginBottom: '10px' }}
        />
      </div>
      {filteredMenuList.map((menuItem, index) => (
        <div key={`menuItem_${index}`}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <div style={{ width: '80%', marginLeft: '10%' }}>{menuItem}</div>
            <div
              style={{
                width: '3%'
              }}
            >
              <Checkbox
                checked={checkboxStates[index]}
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              />
            </div>
          </div>
        </div>
      ))}
    </Modal>
  );
};

export default RoleSelectionModal;

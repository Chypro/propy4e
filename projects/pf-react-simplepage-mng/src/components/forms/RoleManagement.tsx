import React, { useEffect, useState } from 'react';
import { Checkbox, Switch, Menu, Input, Row, Col, Button, Modal } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
interface RoleData {
  checkboxStates: boolean[][];
  roleName: string;
}

interface RoleDataType {
  id: number;
  name: String;
  role: String;
  data: RoleData;
}

interface RoleManagementProps {
  dataForRole: RoleDataType;
  onClose: (
    data: { checkboxStates: boolean[][]; roleName: string } | null,
    roleVisibilityout: boolean
  ) => void;
  roleVisibilityIn: boolean;
}

const RoleManagement: React.FC<RoleManagementProps> = ({
  onClose,
  dataForRole,
  roleVisibilityIn
}) => {
  const menuItems = [
    ['user', 'role', 'Access to management screen'],
    ['Category', 'item', 'Product classification', 'label'],
    [
      'Access to screen ',
      'Product edit',
      'Delete product',
      'Product data import',
      'Product data export'
    ]
  ];

  const [roleName, setRoleName] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const mainMenu = ['management', 'setting', 'cassette to management'];

  const initialCheckboxStates = menuItems.map((items) => Array(items.length).fill(false));

  const [visibleMenus, setVisibleMenus] = useState([false, false, false]);
  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);
  const [searchText, setSearchText] = useState('');
  const [showSelected, setShowSelected] = useState(false);

  const handleSwitchChange = (menuIndex: number, checked: boolean) => {
    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates[menuIndex] = Array(checkboxStates[menuIndex].length).fill(checked);
    setCheckboxStates(updatedCheckboxStates);
  };

  const handleCheckboxChange = (menuIndex: number, itemIndex: number, checked: boolean) => {
    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates[menuIndex][itemIndex] = checked;
    setCheckboxStates(updatedCheckboxStates);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    const data = {
      checkboxStates,
      roleName
    };
    onClose(data, isModalOpen);
  };

  const filteredMenuItems = mainMenu.map((mainMenuText, menuIndex) => {
    return menuItems[menuIndex].filter(
      (item) =>
        item.toLowerCase().includes(searchText.toLowerCase()) &&
        (!showSelected || checkboxStates[menuIndex].some((isChecked) => isChecked))
    );
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onClose(null, isModalOpen);
  };

  const handleOpenModalClick = () => {
    showModal();
  };

  const menus = mainMenu.map((mainMenuText, menuIndex) => {
    return (
      <div key={`menu_${menuIndex}`}>
        <Row
          style={{
            borderBottom: '1px solid #f0f0f0',
            padding: '10px',
            marginBottom: '5px',
            display: 'flex',
            alignItems: 'center',
            color: '#1E1F21'
          }}
        >
          <Col span={22}>
            <a
              style={{ width: '90%', color: '#1E1F21' }}
              onClick={() => {
                setVisibleMenus((prev) => {
                  const updated = [...prev];
                  updated[menuIndex] = !prev[menuIndex];
                  return updated;
                });
              }}
            >
              {mainMenuText}
              <DownOutlined />
            </a>
          </Col>
          <Col span={2}>
            <Switch
              size="small"
              checked={checkboxStates[menuIndex].some((isChecked) => isChecked)}
              onChange={(checked) => handleSwitchChange(menuIndex, checked)}
            />
          </Col>
        </Row>
        {visibleMenus[menuIndex] && (
          <Menu
            style={{
              marginLeft: '30px',
              marginBottom: '10px',
              maxHeight: '150px',
              overflowY: 'auto'
            }}
          >
            {filteredMenuItems[menuIndex].map((menuItemText, itemIndex) => (
              <Menu.Item key={`item_${menuIndex}_${itemIndex}`}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <div style={{ width: '97%' }}>{menuItemText}</div>
                  <div
                    style={{
                      width: '3%'
                    }}
                  >
                    <Checkbox
                      checked={checkboxStates[menuIndex][itemIndex]}
                      onChange={(e) => handleCheckboxChange(menuIndex, itemIndex, e.target.checked)}
                    />
                  </div>
                </div>
              </Menu.Item>
            ))}
          </Menu>
        )}
      </div>
    );
  });

  useEffect(() => {
    if (checkboxStates != null && !isModalOpen && dataForRole) {
      setCheckboxStates(dataForRole.data.checkboxStates);
      setRoleName(dataForRole.data.roleName);
      setIsModalOpen(false);
    }
    // console.log("isModalOpen", isModalOpen);
  }, [isModalOpen]);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
        color: '#1E1F21'
      }}
    >
      {/* <Button style={{ color: "#1E1F21" }} onClick={handleOpenModalClick}>
        Open Modal
      </Button> */}
      <Modal
        title="Role Management"
        open={roleVisibilityIn}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={600}
        // bodyStyle={{ height: "400px", overflow: "auto" }}
        style={{ color: '#1E1F21' }}
        footer={
          <div>
            <Button onClick={handleCancel} style={{ marginRight: '10px' }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Keep</Button>
          </div>
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: '#1E1F21',
            padding: '5px',
            marginBottom: '10px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              color: '#1E1F21'
            }}
          >
            <div style={{ width: '15%', color: '#1E1F21' }}>role name</div>
            <div
              style={{
                width: '85%',
                color: '#1E1F21',
                alignItems: 'flex-end'
              }}
            >
              <Input value={roleName} onChange={(e) => setRoleName(e.target.value)} />
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: '#1E1F21',
            padding: '5px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              color: '#1E1F21',
              marginBottom: '10px'
            }}
          >
            <div style={{ width: '40%', color: '#1E1F21' }}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div
              style={{
                width: '38%',
                color: '#1E1F21',
                marginLeft: '26%',
                alignItems: 'flex-end'
              }}
            >
              Show Selected Permissions
            </div>
            <div
              style={{
                width: '10%',
                color: '#1E1F21'
              }}
            >
              <Checkbox
                checked={showSelected}
                onChange={(e) => setShowSelected(e.target.checked)}
              ></Checkbox>
            </div>
          </div>
        </div>
        <div> {menus}</div>
      </Modal>
    </div>
  );
};

export default RoleManagement;

import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import React, { useEffect, useState } from 'react';
import { appRoute } from '../../utils/routes';
import { LuNetwork, LuWorkflow } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfigProvider, Menu, MenuProps, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import SimplePageFull from '../svg/SimplePageFull';
import SimplePageHalf from '../svg/SimplePageHalf';
import { useAppSelector } from '../../store/store';

const WorkspaceSidebar = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  type MenuItem = Required<MenuProps>['items'][number];
  const items: MenuItem[] = [
    {
      key: 'grp-0',
      type: 'group',
      label: 'MANAGEMENT'
    },
    {
      key: appRoute.workspace,
      icon: React.createElement(LuWorkflow),
      label: 'ワークスペース'
    },
    {
      key: appRoute.workspaceDetails,
      icon: React.createElement(LuNetwork),
      label: 'ワークスペース管理'
    }
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const { token } = theme.useToken();
  const { isWorkspaceSidebarOpen } = useAppSelector((state) => state.persist.appReducer);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleMenuItemClick: MenuProps['onClick'] = (e) => {
    setSelectedKeys(e.keyPath);
    navigate(e.key);
  };

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            groupTitleFontSize: 10
          }
        }
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={!isWorkspaceSidebarOpen}
        collapsedWidth={60}
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '100vh',
          background: token.colorBgContainer,
          borderRightWidth: 2
        }}
      >
        <div className="w-full h-[36px] text-2xl flex justify-center items-center ">
          {isWorkspaceSidebarOpen ? (
            // <img className="w-40 h-40" src={logoFull} alt="" />
            <SimplePageFull></SimplePageFull>
          ) : (
            <SimplePageHalf></SimplePageHalf>
          )}
        </div>
        <Menu
          mode="inline"
          items={items}
          selectedKeys={selectedKeys}
          onClick={handleMenuItemClick}
          style={{
            borderRight: 0,
            background: token.colorBgContainer
          }}
        />
      </Sider>
    </ConfigProvider>
  );
};

export default WorkspaceSidebar;

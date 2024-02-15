import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import {
  AppstoreOutlined,
  AppstoreAddOutlined,
  LockOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { ConfigProvider, Menu, MenuProps } from 'antd';
import { appRoute } from '../../utils/routes';
import { loggedOut } from '../../features/authSlice';

const UserMenu = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  enum UserMenuEnum {
    WORKSPACE = 'workspace',
    MANAGEMENT = 'management',
    RESET_PASSWORD = 'resetPassword',
    LOGOUT = 'logout'
  }

  // const items: MenuItemType[] = [
  //   {
  //     key: UserMenuEnum.WORKSPACE,
  //     icon: <AppstoreOutlined />,
  //     label: 'ワークスペース選択'
  //   },
  //   {
  //     key: UserMenuEnum.MANAGEMENT,
  //     icon: <AppstoreAddOutlined />,
  //     label: '管理画面に移動'
  //   },
  //   {
  //     key: UserMenuEnum.RESET_PASSWORD,
  //     icon: <LockOutlined />,
  //     label: 'パスワード再設定'
  //   },
  //   {
  //     key: UserMenuEnum.LOGOUT,
  //     icon: <LogoutOutlined />,
  //     label: 'ログアウト'
  //   }
  // ];

  // const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  // const handleMenuItemClick: MenuProps['onClick'] = (e) => {
  //   console.log('e :>> ', e);
  //   switch (e.key) {
  //     case UserMenuEnum.WORKSPACE:
  //       console.log('Workspace selection clicked');
  //       navigate(appRoute.workspace);
  //       break;
  //     case UserMenuEnum.MANAGEMENT:
  //       navigate(appRoute.workspaceDetails);
  //       break;
  //     case UserMenuEnum.RESET_PASSWORD:
  //       console.log('Resetting a password clicked');
  //       break;
  //     case UserMenuEnum.LOGOUT:
  //       console.log('Logout clicked');
  //       dispatch(loggedOut());
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleLogout = () => {
    dispatch(loggedOut());
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            margin: 0,
            colorBgBase: 'transparent'
          }
        }
      }}
    >
      {/* <Menu
        onClick={handleMenuItemClick}
        items={items}
        selectedKeys={[]}
        style={{
          backgroundColor: 'transparent',
          borderRight: 0
        }}
      /> */}
      <Menu style={{ backgroundColor: 'transparent', borderRightWidth: 0 }} selectable={false}>
        <Menu.Item key={UserMenuEnum.WORKSPACE} icon={<AppstoreOutlined />}>
          <Link to={appRoute.workspace} target="_blank">
            ワークスペース選択
          </Link>
        </Menu.Item>
        <Menu.Item key={UserMenuEnum.MANAGEMENT} icon={<AppstoreAddOutlined />}>
          <Link to={appRoute.workspaceDetails} target="_blank">
            管理画面に移動
          </Link>
        </Menu.Item>
        <Menu.Item key={UserMenuEnum.RESET_PASSWORD} icon={<LockOutlined />}>
          パスワード再設定
        </Menu.Item>
        <Menu.Item key={UserMenuEnum.LOGOUT} icon={<LogoutOutlined />} onClick={handleLogout}>
          ログアウト
        </Menu.Item>
      </Menu>
    </ConfigProvider>
  );
};

export default UserMenu;

import { Divider, Menu, MenuProps } from 'antd';
import {
  AppstoreOutlined,
  AppstoreAddOutlined,
  LockOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { loggedOut } from '../../features/authSlice';

import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useNavigate } from 'react-router-dom';
import { appRoute } from '../../utils/routes';

const UserMenuPopover = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  enum UserMenuEnum {
    WORKSPACE = 'workspace',
    MANAGEMENT = 'management',
    RESET_PASSWORD = 'resetPassword',
    LOGOUT = 'logout'
  }
  const items: MenuItemType[] = [
    {
      key: UserMenuEnum.WORKSPACE,
      icon: <AppstoreOutlined />,
      label: 'ワークスペース選択'
    },
    {
      key: UserMenuEnum.MANAGEMENT,
      icon: <AppstoreAddOutlined />,
      label: '管理画面に移動'
    },
    {
      key: UserMenuEnum.RESET_PASSWORD,
      icon: <LockOutlined />,
      label: 'パスワード再設定'
    },
    {
      key: UserMenuEnum.LOGOUT,
      icon: <LogoutOutlined />,
      label: 'ログアウト'
    }
  ];

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { user, email } = useAppSelector((state) => state.persist.authReducer);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  const handleMenuItemClick: MenuProps['onClick'] = (e) => {
    console.log('e :>> ', e);
    switch (e.key) {
      case UserMenuEnum.WORKSPACE:
        console.log('Workspace selection clicked');
        navigate(appRoute.workspace);
        // window.open('/workspace-table', '_blank');
        break;
      case UserMenuEnum.MANAGEMENT:
        navigate(appRoute.workspaceDetails);
        break;
      case UserMenuEnum.RESET_PASSWORD:
        console.log('Resetting a password clicked');
        break;
      case UserMenuEnum.LOGOUT:
        console.log('Logout clicked');
        dispatch(loggedOut());
        break;
      default:
        break;
    }
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <div className="px-4 pb-2">
        <div className="text-[16px] font-semibold">
          {user.firstName} {user.lastName}
        </div>
        <div>{email}</div>
      </div>

      <Divider
        style={{
          margin: 0
        }}
      />

      <Menu
        onClick={handleMenuItemClick}
        items={items}
        selectedKeys={[]}
        style={{
          backgroundColor: 'transparent',
          borderRight: 0
        }}
      />
    </div>
  );
};

export default UserMenuPopover;

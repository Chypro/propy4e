import { Button, ConfigProvider, theme } from 'antd';
import React from 'react';
import { layout } from '../../utils/constant';
import { Header } from 'antd/es/layout/layout';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { ThemeSwitchButton, UserButton } from '..';
import { setIsWorkspaceSidebarOpen } from '../../features/appSlice';

const WorkspaceHeader = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useAppDispatch();

  const { token } = theme.useToken();
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const { isWorkspaceSidebarOpen } = useAppSelector((state) => state.persist.appReducer);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleSidebarOpen = (value: boolean): void => {
    dispatch(setIsWorkspaceSidebarOpen(value));
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Header
      style={{ padding: 0, height: layout.workspace.header, background: token.colorBgContainer }}
    >
      <div className="flex w-full h-full justify-between items-center ps-[2px] pe-2 ">
        <div className="flex items-center">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorLink: themeColor['gray'][700],
                  colorLinkHover: themeColor[primaryColor][300],
                  fontSize: 16
                }
              }
            }}
          >
            <Button
              onClick={() => handleSidebarOpen(!isWorkspaceSidebarOpen)}
              type="link"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              icon={isWorkspaceSidebarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
            ></Button>
          </ConfigProvider>
        </div>

        <div className="flex items-center space-x-2 justify-center h-full">
          <ThemeSwitchButton size={24} />
          <UserButton />
        </div>
      </div>
    </Header>
  );
};

export default WorkspaceHeader;

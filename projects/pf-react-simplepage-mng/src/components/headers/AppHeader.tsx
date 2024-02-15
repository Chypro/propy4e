import React, { useEffect, useState } from 'react';
import { Layout, Input, Space, Button, ConfigProvider } from 'antd';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineSetting } from 'react-icons/ai';

import { AppHamburgerButton, HeaderSearchInput, ThemeSwitchButton, UserButton } from '..';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setIsSidebarOpen } from '../../features/appSlice';
import { layout } from '../../utils/constant';
import { theme } from 'antd';
import { Workspace } from '../../types/app/workspace';

const { Header } = Layout;

const AppHeader = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const dispatch = useAppDispatch();

  const isSidebarOpen = useAppSelector((state) => state.persist.appReducer.isSidebarOpen);
  const primaryColor = useAppSelector((state) => state.persist.themeReducer.primaryColor);
  const themeColor = useAppSelector((state) => state.persist.themeReducer.themeColor);
  const { selectedWorkspaceDomain } = useAppSelector((state) => state.persist.appReducer);
  const { workspaceList } = useAppSelector((state) => state.workspaceReducer);

  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleSidebarOpen = (value: boolean): void => {
    dispatch(setIsSidebarOpen(value));
  };

  useEffect(() => {
    setSelectedWorkspace(
      workspaceList.find((workspace) => workspace.domain === selectedWorkspaceDomain)
    );
  }, [selectedWorkspaceDomain, workspaceList]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Header style={{ padding: 0, height: layout.header, background: colorBgContainer }}>
      <div className="flex w-full h-full items-center ps-[2px] pe-2 justify-between lg:justify-start">
        <div className="flex items-center w-[250px] space-x-2">
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
              onClick={() => handleSidebarOpen(!isSidebarOpen)}
              type="link"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              icon={isSidebarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
            ></Button>
          </ConfigProvider>
          <div className="lg:text-lg text-sm truncate">{selectedWorkspace?.name}</div>
        </div>

        {/* only display while screen size > lg */}
        <div
          style={{
            width: 'calc(100% - 450px) ',
            height: '100%'
          }}
          className="hidden lg:block"
        >
          <HeaderSearchInput />
        </div>

        <div className="hidden lg:flex items-center space-x-2 justify-end h-full w-[200px] ">
          <ThemeSwitchButton size={24} />
          <UserButton />
        </div>

        {/* only display while screen size < lg */}
        <div className="lg:hidden">
          <AppHamburgerButton />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;

import React from 'react';
import { useAppSelector } from '../../store/store';
import { layout } from '../../utils/constant';
import { Content } from 'antd/es/layout/layout';
import { AppFloatButton, AppHeader, AppSidebar, WorkspaceHeader, WorkspaceSidebar } from '..';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const WorkspaceLayout = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Layout hasSider style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      {/* sidebar */}
      <WorkspaceSidebar />
      <Layout>
        {/* header */}
        <WorkspaceHeader />
        {/* content */}
        <Content
          style={{
            overflow: 'auto',
            maxHeight: `calc(100vh - ${layout.workspace.header}px)`,
            background: themeColor.gray[50],
            position: 'relative'
          }}
        >
          <div
            style={{
              boxShadow: `2px 2px 4px ${themeColor[primaryColor][400]}`
            }}
            className="fixed w-full h-[1px]"
          />
          <div
            style={{ boxShadow: `2px 2px 4px ${themeColor[primaryColor][400]}` }}
            className="fixed h-full w-[1px]"
          />

          <Outlet />
        </Content>
      </Layout>
      <AppFloatButton />
    </Layout>
  );
};

export default WorkspaceLayout;

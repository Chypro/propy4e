import { Layout } from 'antd';
import { AppFloatButton, AppHeader, AppSidebar } from '..';
import { useAppSelector } from '../../store/store';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import { layout } from '../../utils/constant';

const AppLayout = () => {
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
      <AppSidebar />
      <Layout>
        {/* header */}
        <AppHeader />
        {/* content */}
        <Content
          style={{
            overflow: 'auto',
            maxHeight: `calc(100vh - ${layout.header}px)`,
            background: themeColor.gray[50],
            position: 'relative'
          }}
        >
          <div
            style={{
              boxShadow: `2px 2px 4px ${themeColor[primaryColor][400]}`
            }}
            className="fixed w-full h-[1px] z-10"
          />
          <div
            style={{ boxShadow: `2px 2px 4px ${themeColor[primaryColor][400]}` }}
            className="fixed h-full w-[1px] z-10"
          />
          <Outlet />
        </Content>
      </Layout>
      <AppFloatButton />
    </Layout>
  );
};

export default AppLayout;

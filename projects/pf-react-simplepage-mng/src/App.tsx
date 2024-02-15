import { ConfigProvider, theme } from 'antd';
import { AppLayout, AppSetup, WorkspaceLayout } from './components';
import { useAppDispatch, useAppSelector } from './store/store';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { appRoute } from './utils/routes';

import {
  BlockDetailPage,
  BlockManagePage,
  CreateSitePage,
  LoginPage,
  PasswordResetPage,
  PraticePage,
  SettingPage,
  SiteManagePage,
  WorkspacePage
} from './pages';

import WorkspaceDetails from './pages/WorkspaceDetails';
import HomePage from './pages/HomePage.tsx';
import { useEffect } from 'react';
import { setScreenSize } from './features/appSlice.ts';
import SkuDetailPage from './pages/SkuDetailPage.tsx';
import SearchListPage from './pages/SearchListPage.tsx';

function App() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.persist.themeReducer.isDarkMode);
  const themeColor = useAppSelector((state) => state.persist.themeReducer.themeColor);
  const primaryColor = useAppSelector((state) => state.persist.themeReducer.primaryColor);

  const { defaultAlgorithm, darkAlgorithm } = theme;

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    // handle window resize
    const handleResize = () => {
      const screenSize = {
        x: window.innerWidth,
        y: window.innerHeight
      };
      dispatch(setScreenSize(screenSize));
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ConfigProvider
      warning={{ strict: false }}
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: themeColor[primaryColor][500]
        },
        components: {
          Table: {
            borderColor: themeColor[primaryColor][100],
            headerBg: themeColor[primaryColor][200],
            headerColor: themeColor.gray[600],
            headerSplitColor: themeColor.gray[500]
          }
        }
      }}
    >
      <AppSetup />

      <HashRouter future={{ v7_startTransition: true }}>
        <Routes>
          {/* public routes */}
          <Route path={appRoute.login} element={<LoginPage />} />
          <Route path={appRoute.reset} element={<PasswordResetPage />} />

          {/* protected routes */}
          <Route element={<WorkspaceLayout />}>
            <Route path={appRoute.workspace} element={<WorkspacePage />} />
            <Route path={appRoute.workspaceManage} element={<WorkspaceDetails />} />
            <Route path={appRoute.workspaceDetails} element={<WorkspaceDetails />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path={appRoute.home} element={<HomePage />} />
            <Route path={appRoute.setting} element={<SettingPage />} />

            <Route path={appRoute.blockDetail} element={<BlockDetailPage />} />
            <Route path={appRoute.block} element={<BlockManagePage />} />
            <Route path={appRoute.media} element={<SiteManagePage />} />
            <Route path={appRoute.pratice} element={<div>practice</div>} />
            <Route path={appRoute.createSite} element={<CreateSitePage />} />
            <Route path={appRoute.skuDetail} element={<SkuDetailPage />} />
            <Route path={appRoute.keyWordSerch} element={<SearchListPage />} />
            {/* <Route path={appRoute.workspace} element={<WorkSpace />} /> */}
          </Route>
        </Routes>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;

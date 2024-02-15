import { useEffect, useRef, useState } from 'react';
import { Menu, Button, ConfigProvider, theme, Tooltip, MenuProps, MenuRef } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { appRoute } from '../../utils/routes';

import { IoMdSettings } from 'react-icons/io';
import { useAppSelector } from '../../store/store';
import { MenuItem, sideBarContents } from '../../data/channel';

import { AppstoreAddOutlined, ProductOutlined } from '@ant-design/icons';
import { paramKey } from '../../utils/constant';
import SimplePageFull from '../svg/SimplePageFull';
import SimplePageHalf from '../svg/SimplePageHalf';
import { FaTags } from 'react-icons/fa6';
import { SubMenuType } from 'antd/es/menu/hooks/useItems';
import { useGetSiteListQuery } from '../../services/sitesApi';

const AppSidebar = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  type MenuItem = Required<MenuProps>['items'][number];
  const items: MenuItem[] = [
    {
      key: 'grp-0',
      type: 'group',
      label: ''
    },
    {
      key: appRoute.media,
      icon: <ProductOutlined />,
      label: 'サイト管理'
    },
    {
      key: appRoute.createSite,
      icon: <AppstoreAddOutlined />,
      label: '新しいサイト'
    }
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { token } = theme.useToken();

  const isSidebarOpen = useAppSelector((state) => state.persist.appReducer.isSidebarOpen);

  const getSiteListQuery = useGetSiteListQuery();

  const [sidebarItems, setSideItems] = useState(items);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleMenuItemClick: MenuProps['onClick'] = (e) => {
    // console.log('value :>> ', e);
    setSelectedKeys(e.keyPath);
    console.log(e);
    if (e.keyPath.length === 2) {
      const last = e.keyPath.length - 1;
      const parent = e.keyPath[last];
      if (parent === appRoute.media) {
        const child = e.key;
        const param = child.substring(child.indexOf('&') + 1);

        setSearchParams({ [paramKey.media.tag]: param });
        navigate({ pathname: parent, search: `?${paramKey.media.tag}=${param}` });
      }
    } else {
      navigate(e.key);
    }
  };

  const handleMenuItemOpen = (keys: string[]) => {
    setOpenKeys(keys);
  };

  useEffect(() => {
    console.log('location :>> ', location);
    if (location.pathname === appRoute.media) {
      const keys = [location.pathname];
      setOpenKeys(keys);

      if (location.search) {
        const param = searchParams.get(paramKey.media.tag);
        keys.push(appRoute.media + '&' + param);
      } else {
        keys.push(appRoute.media + '&1');
      }
      setSelectedKeys(keys);
    } else {
      if (location.pathname === appRoute.createSite) {
        setSelectedKeys([location.pathname]);
      }
    }
  }, [location]);

  useEffect(() => {
    if (getSiteListQuery.isSuccess) {
      console.log(getSiteListQuery.data);
      if (getSiteListQuery.data.result === 'success') {
        let siteItems: MenuItem[] = [];
        getSiteListQuery.data.data.map((site) => {
          let siteItem: MenuItem = {
            key: appRoute.media + '&' + site.cd,
            icon: <FaTags />,
            label: site.name
          };
          siteItems.push(siteItem);
        });

        const updatedSidebarItems = sidebarItems.map((item) => {
          if (item.key === appRoute.media) {
            (item as SubMenuType).children = [...siteItems];
          }
          return item;
        });

        console.log('updatedSidebarItems :>> ', updatedSidebarItems);
        setSideItems(updatedSidebarItems);
        console.log('location :>> ', location);
        if (location.pathname === appRoute.media && location.search === '') {
          navigate({
            pathname: appRoute.media,
            search: `?${paramKey.media.tag}=${getSiteListQuery.data.data[0].cd}`
          });
        }
      }
    }
  }, [getSiteListQuery]);

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
        collapsed={!isSidebarOpen}
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
          {isSidebarOpen ? (
            // <img className="w-40 h-40" src={logoFull} alt="" />
            <SimplePageFull></SimplePageFull>
          ) : (
            <SimplePageHalf></SimplePageHalf>
          )}
        </div>
        <Menu
          mode="inline"
          items={sidebarItems}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={handleMenuItemClick}
          onOpenChange={handleMenuItemOpen}
          style={{
            borderRight: 0,
            background: token.colorBgContainer
          }}
        />
        {/* <div className="sticky top-[calc(100%-40px)]">
          <Link to={appRoute.setting}>
            <div className="w-full flex justify-center p-1 ">
              <Tooltip placement="right" title={!isSidebarOpen ? '設定' : ''}>
                <Button type="text" style={{ height: 40, width: '100%' }}>
                  <div className="flex justify-start items-center space-x-3">
                    <IoMdSettings size={18} />
                    {isSidebarOpen && <div>設定</div>}
                  </div>
                </Button>
              </Tooltip>
            </div>
          </Link>
        </div> */}
      </Sider>
    </ConfigProvider>
  );
};

export default AppSidebar;

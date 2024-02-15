import { useEffect, useState } from 'react';
import {
  CategorySettingTab,
  ItemSettingTab,
  LabelSettingTab,
  ProductClassificationSettingTab,
  ProtectedRoute,
  SiteSettingTab,
  SiteCategoryTab,
} from '../components';
import { useAppSelector } from '../store/store';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { ConfigProvider, Tabs, TabsProps, Button } from 'antd';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { paramKey } from '../utils/constant';
import { appRoute } from '../utils/routes';

const SettingPage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { selectedSiteID } = useAppSelector((state) => state.persist.appReducer);

  enum SettingTabEnum {
    category = '1',
    item = '2',
    productClassification = '3',
    label = '4',
  }

  const items: TabsProps['items'] = [
    {
      key: SettingTabEnum.category,
      label: 'カテゴリ',
      children: <SiteCategoryTab />
    },
    {
      key: SettingTabEnum.item,
      label: '商品項目',
      children: <ItemSettingTab />
    },
    {
      key: SettingTabEnum.productClassification,
      label: '商品分類',
      children: <ProductClassificationSettingTab />
    },
    {
      key: SettingTabEnum.label,
      label: 'ラベル',
      children: <LabelSettingTab />
    },
  ];

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedTab, setSelectedTab] = useState<SettingTabEnum>(SettingTabEnum.category);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleTabClick = (key: string) => {
    console.log(key);
    setSearchParams({ [paramKey.setting.tab]: key });
    setSelectedTab(key as SettingTabEnum);
  };

  useEffect(() => {
    if (searchParams.get(paramKey.setting.tab)) {
      const tab = searchParams.get(paramKey.setting.tab) as SettingTabEnum;
      if (Object.values(SettingTabEnum).includes(tab)) {
        setSelectedTab(tab);
      }
    }
  }, []);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ProtectedRoute>
      <div className="h-full w-full p-4" style={{ backgroundColor: themeColor.gray[50] }}>
        {/* title */}
        <div
          style={{ color: themeColor.gray[800] }}
          className="md:text-2xl text-base font-semibold text-left pe-2 mb-1 md:mb-0"
        >
          <Link to={`${appRoute.media}?${paramKey.media.tag}=${selectedSiteID}`}>
            <Button type='text' icon={<DoubleLeftOutlined />} size={'large'}/>
          </Link>
          設定
        </div>
        {/* tabs */}

        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                horizontalItemPadding: '0'
              }
            }
          }}
        >
          <Tabs size="large" activeKey={selectedTab} items={items} onChange={handleTabClick} />
        </ConfigProvider>
      </div>
    </ProtectedRoute>
  );
};

export default SettingPage;

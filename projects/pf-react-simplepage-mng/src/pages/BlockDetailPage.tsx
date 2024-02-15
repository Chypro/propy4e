import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paramKey } from '../utils/constant';
import {
  BlockDetailAssetTab,
  BlockDetailAttributesTab,
  BlockDetailSiteCategoryTab,
  BlockDetailSkuTab,
  NotFound,
  ProtectedRoute
} from '../components';
import { useAppSelector } from '../store/store';
import {
  Button,
  Cascader,
  ConfigProvider,
  Form,
  Image,
  Input,
  Modal,
  Skeleton,
  Tabs,
  TabsProps,
  message
} from 'antd';
import { IoArrowBack } from 'react-icons/io5';
import {
  useGetBlockDetailMutation,
  useUpdateBlockMutation,
  useUpdateCategoryOfBlockMutation
} from '../services/blockApi';
import {
  GetBlockDetailResponse,
  PclData,
  UpdateBlockResponse,
  UpdateCategoryOfBlockRequest,
  UpdateCategoryOfBlockRespose
} from '../types/api/block';
import { BlockDetail } from '../types/app/block';
import { fallback } from '../data/imgFallback';
import TextArea from 'antd/es/input/TextArea';
import { appRoute } from '../utils/routes';
import { useDispatch } from 'react-redux';
import { setBlockDetail, updateAttribute } from '../features/blockDetailSlice';
import { Category } from '../types/app/categories';
import { findAncestors } from '../utils/utils';
import CustomImage from '../components/datadisplay/CustomImage';
import {
  setBlockUpdateDescription,
  setBlockUpdateId,
  setBlockUpdateName,
  setBlockUpdatePclData
} from '../features/blockUpdateValueSlice';

const BlockDetailPage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  enum BlockDetailEnum {
    commonAttributes = '1',
    sku = '2',
    siteCategory = '3',
    asset = '4'
  }

  const items: TabsProps['items'] = [
    {
      key: BlockDetailEnum.sku,
      label: 'SKU',
      children: <BlockDetailSkuTab />
    },
    {
      key: BlockDetailEnum.commonAttributes,
      label: '共通項目',
      children: <BlockDetailAttributesTab />
    }
    // {
    //   key: BlockDetailEnum.siteCategory,
    //   label: 'サイトカテゴリ',
    //   children: <BlockDetailSiteCategoryTab />
    // }
    // {
    //   key: BlockDetailEnum.asset,
    //   label: 'アセット',
    //   children: <BlockDetailAssetTab />
    // }
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const { selectedSiteID } = useAppSelector((state) => state.persist.appReducer);
  const { blockDetail } = useAppSelector((state) => state.blockDetailReducer);
  const { category } = useAppSelector((state) => state.siteReducer);
  const [getBlockDetail, { isLoading }] = useGetBlockDetailMutation();
  const [categoryKeys, setCategoryKeys] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // const [blockDetail, setBlockDetail] = useState<BlockDetail>(null);
  const [selectedTab, setSelectedTab] = useState<BlockDetailEnum>(BlockDetailEnum.sku);

  const updateBlockRequest = useAppSelector((state) => state.blockUpdateValueReducer);
  const [updateBlock, { isLoading: isBlockUpdateLoading }] = useUpdateBlockMutation();
  const [updateCategoryMutation, { isLoading: isCategoryUpdateLoading }] =
    useUpdateCategoryOfBlockMutation();
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleTabClick = (key: string) => {
    setSearchParams({
      [paramKey.blockDetail.id]: blockDetail?.id,
      [paramKey.blockDetail.tab]: key
    });
    setSelectedTab(key as BlockDetailEnum);
  };

  const handlePrevPageClick = () => {
    navigate({
      pathname: appRoute.media,
      search: `?${paramKey.media.tag}=${selectedSiteID}`
    });
  };

  const getBlockList = (id: string) => {
    getBlockDetail(id).then((res: any) => {
      if (res.error) {
        // message.error('ブロック詳細取得エラー');
      } else {
        const response = res.data as GetBlockDetailResponse;
        if (response.result === 'success') {
          let blockDetailContainer: BlockDetail = {
            id: response.data.id,
            name: response.data.prd_series,
            img: response.data.img,
            description: response.data.prd_note,
            pclId: response.data.product_classification.cd,
            attributes: [],
            categoryId: response.data.sp_category_tree.length
              ? response.data.sp_category_tree[0].category.code
              : []
          };
          const array: string[] = findAncestors(category, blockDetailContainer.categoryId);
          setCategoryKeys(array);
          response.data.attributes.map((attr) => {
            blockDetailContainer.attributes.push({
              cd: attr.attribute,
              id: attr.id,
              name: attr.name,
              type: attr.control_type,
              require: attr.not_null === '1' ? true : false,
              defaultValue: attr.default_value,
              value: attr.value,
              isWithUnit: attr.is_with_unit === '1' ? true : false,
              units: attr.unit ? attr.unit.split(';') : [],
              order: attr.order,
              options: attr.select_list ? attr.select_list.split(';') : [],
              maxLength: attr.max_length,
              isCommon: attr.is_common === '1' ? true : false,
              isDeleted: attr.is_deleted === '1' ? true : false,
              isFixed: attr.is_fixed === '1' ? true : false,
              isPrivate: attr.is_private === '1' ? true : false
            });
          });

          dispatch(setBlockDetail(blockDetailContainer));
          dispatch(setBlockUpdateName(blockDetailContainer.name));
          dispatch(setBlockUpdateDescription(blockDetailContainer.description));
          dispatch(setBlockUpdateId(blockDetailContainer.id));
        }
      }
    });
  };

  const updateBlockValue = () => {
    if (categoryKeys) {
      updateCategory(categoryKeys);
    }
    updateBlock(updateBlockRequest).then((res: any) => {
      if (res.error) {
      } else {
        const response = res.data as UpdateBlockResponse;
        if (response.result === 'success') {
          message.success('ブロック情報がアップデートされました。');
        }
      }
    });
  };

  useEffect(() => {
    if (searchParams.get(paramKey.blockDetail.id)) {
      const id = searchParams.get(paramKey.blockDetail.id);
      if (id !== '') {
        getBlockList(id);
      }
    }
    if (searchParams.get(paramKey.blockDetail.tab)) {
      const tab = searchParams.get(paramKey.blockDetail.tab);
      setSelectedTab((tab as BlockDetailEnum) ?? BlockDetailEnum.commonAttributes);
    }
  }, [searchParams]);

  const handleCascader = (selectedKeys: string[]) => {
    // updateCategory(selectedKeys);

    setCategoryKeys(selectedKeys);
  };

  const updateCategory = (selectedKeys: string[]) => {
    const request: UpdateCategoryOfBlockRequest = {
      body: {
        category_codes: [selectedKeys[selectedKeys.length - 1]],
        channel_cd: selectedSiteID,
        product_codes: [blockDetail.id]
      }
    };

    updateCategoryMutation(request).then((res: any) => {
      if (res.error) {
      } else {
        const response = res.data as UpdateCategoryOfBlockRespose;
        if (response.result === 'success') {
        }
      }
    });
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ProtectedRoute>
      <div
        style={{ backgroundColor: themeColor.gray[50], color: themeColor.gray[700] }}
        className="w-full h-full p-4"
      >
        {/* header */}
        <div className="w-full flex items-center justify-between">
          <div className=" flex-none">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorLink: themeColor['gray'][700],
                    colorLinkHover: themeColor[primaryColor][300],
                    fontSize: 24
                  }
                }
              }}
            >
              <Button
                type="link"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={handlePrevPageClick}
                icon={<IoArrowBack />}
              ></Button>
            </ConfigProvider>
          </div>
          <div
            style={{ color: themeColor.gray[800] }}
            className=" flex-none md:text-2xl text-base font-semibold text-left pe-2  md:mb-0 truncate max-w-[120px] md:max-w-[500px]"
          >
            ブロック詳細
          </div>
          <div className=" ml-auto justify-items-end">
            <Button
              loading={isBlockUpdateLoading}
              onClick={() => updateBlockValue()}
              type="primary"
            >
              保存
            </Button>
          </div>
        </div>

        {/* base info */}
        <div className="w-full md:flex p-2 md:space-x-4 ">
          <div>
            <CustomImage
              ImageProps={{
                style: { width: 150, height: 150 },
                src: blockDetail?.img,
                fallback: fallback
              }}
              URL={blockDetail?.img}
            ></CustomImage>
          </div>

          <div className="max-w-[300px] w-full ">
            <Form>
              <Form.Item label={'名前'}>
                <Input
                  value={updateBlockRequest.body.series}
                  onChange={(e) => dispatch(setBlockUpdateName(e.target.value))}
                ></Input>
              </Form.Item>
              <Form.Item label={'説明'}>
                <TextArea
                  onChange={(e) => dispatch(setBlockUpdateDescription(e.target.value))}
                  value={updateBlockRequest.body.comform.NOTE}
                  rows={4}
                ></TextArea>
              </Form.Item>
            </Form>
          </div>
          <div>
            <Form>
              <Form.Item label={'サイトカテゴリ'}>
                <Cascader
                  placeholder={'紐づけられているカテゴリーがありません'}
                  loading={isLoading}
                  value={categoryKeys}
                  expandTrigger="hover"
                  options={category}
                  className="w-[500px]"
                  onChange={handleCascader}
                ></Cascader>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* detail tabs */}
        <Tabs items={items} activeKey={selectedTab} onChange={handleTabClick} />
      </div>
    </ProtectedRoute>
  );
};

export default BlockDetailPage;

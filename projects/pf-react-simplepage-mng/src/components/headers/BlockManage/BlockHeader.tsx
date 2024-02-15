import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Button, Cascader, ConfigProvider, Segmented, Space, Tooltip, message } from 'antd';
import { layout, windowSize } from '../../../utils/constant';
import { setBlockBlockList, setBlockDisplayMode, setTotal } from '../../../features/blockSlice';
import { DisplayMode } from '../../../types/app/common';
import {
  DownloadOutlined,
  StopOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  RotateLeftOutlined,
  PlusSquareOutlined,
  PlusOutlined,
  DiffOutlined,
  FilterOutlined
} from '@ant-design/icons';
import BlockRegisterModal from '../../modals/BlockRegisterModal';
import PopconfirmButton from '../../buttons/PopconfirmButton';
import { useGetCategoriesMutation } from '../../../services/categoriesApi';
import {
  CategoryData,
  GetCategoriesData,
  GetCategoriesResponse
} from '../../../types/api/category';
import {
  useGetBlockDisplayListMutation,
  useGetSortedBlockByCategoryMutation
} from '../../../services/blockApi';
import {
  BlockResponseType,
  getBlockDisplayRequestType,
  getSortedBlockByCategoryRequestType
} from '../../../types/api/block';
import { Block } from '../../../types/app/block';
import { Category } from '../../../types/app/categories';

const BlockHeader = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const { selectedRowKeys } = useAppSelector((state) => state.blockReducer);
  const { themeColor } = useAppSelector((state) => state.persist.themeReducer);
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<boolean>(false);
  const [getCategory, {}] = useGetCategoriesMutation();
  const [categories, setCategories] = useState<Category[]>();
  const [getBlockByCategory, { isSuccess: isBlockListSuccess }] =
    useGetSortedBlockByCategoryMutation();
  const [getBlockList, { isLoading }] = useGetBlockDisplayListMutation();
  const { blockBlockList, pageSize, currentPage } = useAppSelector((state) => state.blockReducer);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleDisplayModeChange = (value: string) => {
    dispatch(setBlockDisplayMode(value as DisplayMode));
  };

  useEffect(() => {
    getCategory(0).then((res: any) => {
      if (res.error) {
      } else {
        const response = res.data as GetCategoriesResponse;
        console.log(response.data);
        const newOption: Category[] = convertToOptions(response.data.children);
        setCategories(newOption);
      }
    });
  }, []);

  function convertToOptions(data: GetCategoriesData[]): Category[] {
    return data.map(
      (item) =>
        ({
          value: item.category.code,
          label: item.category.name ?? '',
          children: item.children ? convertToOptions(item.children) : undefined
        }) as unknown as Category
    );
  }
  const resetBlockList = () => {
    const request: getBlockDisplayRequestType = {
      offset: (currentPage - 1) * pageSize,
      pagination: pageSize,
      sort: 'series',
      order: 'asc',
      deleted: 0,
      channelCd: 0
    };
    getBlockList(request).then((res: any) => {
      if (res.error) {
        // message.error('ブロックリスト取得エラー');
      } else {
        const response = res.data as BlockResponseType;
        if (response.result === 'success') {
          dispatch(setTotal(response.total));

          let blockList: Block[] = [];
          response.data.map((data) => {
            const block: Block = {
              id: data.id,
              img: data.img,
              name: data.name,
              productClassification: {
                name: ''
              },
              spCategory: data.sp_category_tree
            };

            blockList.push(block);
          });

          dispatch(setBlockBlockList(blockList));
        }
      }
    });
  };

  const handleCascader = (selectedCategoryKeys: string[]) => {
    if (!selectedCategoryKeys.length) return;
    const categoryId = selectedCategoryKeys[selectedCategoryKeys.length - 1];
    const request: getSortedBlockByCategoryRequestType = {
      id: categoryId,
      offset: (currentPage - 1) * pageSize,
      deleted: 0,
      pagination: pageSize
    };
    getBlockByCategory(request).then((res: any) => {
      if (res.error) {
        // message.error('ブロックリスト取得エラー');
      } else {
        const response = res.data as BlockResponseType;
        if (response.result === 'success') {
          console.log(response.data);
          if (response.data.length) {
            dispatch(setTotal(response.total));

            let blockList: Block[] = [];
            response.data.map((data) => {
              const block: Block = {
                id: data.id,
                img: data.img,
                name: data.name,
                productClassification: {
                  name: ''
                },
                spCategory: data.sp_category_tree
              };

              blockList.push(block);
            });
            console.log(blockBlockList);
            dispatch(setBlockBlockList(blockList));
          } else {
            dispatch(setTotal(0));
            dispatch(setBlockBlockList([]));
          }
        }
      }
    });
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <>
      <div
        style={{ height: layout.blockManage.header }}
        className="w-full flex justify-between items-center "
      >
        {/* left */}
        <div className="flex items-center">
          {/* title */}
          <div
            style={{ color: themeColor.gray[800] }}
            className=" md:text-2xl text-base font-semibold text-left pe-2  md:mb-0"
          >
            ブロック一覧123
          </div>

          {/* display mode switch */}
          <Segmented
            size={screenSize.x > windowSize.md ? 'middle' : 'small'}
            onChange={handleDisplayModeChange}
            options={[
              {
                value: 'table',
                icon: (
                  <Tooltip title={'リスト表示に変更'}>
                    <UnorderedListOutlined />
                  </Tooltip>
                )
              },
              {
                value: 'grid',
                icon: (
                  <Tooltip title={'グリッド表示に変更'}>
                    <AppstoreOutlined />
                  </Tooltip>
                )
              }
            ]}
          ></Segmented>
        </div>
        {/* right */}
        <div>
          <Space className="absolute right-3 top-5">
            <Button
              icon={<PlusOutlined></PlusOutlined>}
              onClick={() => setIsRegisterModalOpen(true)}
              type="primary"
            >
              新ブロック登録
            </Button>
            <Tooltip title="商品データのインポートを行う">
              <Button size="middle" type="primary" icon={<DiffOutlined />}></Button>
            </Tooltip>

            <BlockRegisterModal
              ModalProps={{
                open: isRegisterModalOpen,
                onCancel: () => setIsRegisterModalOpen(false)
              }}
            ></BlockRegisterModal>
          </Space>
        </div>
      </div>
      <div className="mt-2">
        <Space>
          <Button
            disabled={selectedRowKeys.length === 0}
            type="primary"
            icon={<RotateLeftOutlined />}
            onClick={() => setIsWithdrawModalOpen(true)}
          >
            サイトでの配信を停止
          </Button>

          <PopconfirmButton
            PopconfirmProps={{
              title: 'ダウンロード',
              description: 'チェックされたブロックをダウンロードします'
            }}
            ButtonProps={{
              icon: <DownloadOutlined />,
              disabled: selectedRowKeys.length === 0
            }}
            tooltipLable="ブロックをダウンロード"
          ></PopconfirmButton>

          <ConfigProvider
            theme={{
              components: {
                Button: {
                  controlHeight: 25,
                  onlyIconSize: 14,
                  borderRadius: 4
                }
              }
            }}
          >
            <Tooltip title="カテゴリから絞り込み">
              <Cascader
                expandTrigger="hover"
                onClear={() => {
                  resetBlockList();
                }}
                onChange={handleCascader}
                options={categories}
                placeholder="カテゴリーから絞り込み"
              />
            </Tooltip>
          </ConfigProvider>
        </Space>
      </div>
    </>
  );
};

export default BlockHeader;

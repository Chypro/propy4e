import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/store';
import { Button, Cascader, ConfigProvider, Modal, Segmented, Space, Tooltip, message } from 'antd';
import { paramKey, windowSize } from '../../../utils/constant';
import { DisplayModeSwitchButton, WithDrawBlockModal } from '../..';
import PopconfirmButton from '../../buttons/PopconfirmButton';
import {
  PlusOutlined,
  DownloadOutlined,
  RotateLeftOutlined,
  FilterOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  setCategory,
  setSiteBlockList,
  setSiteDisplayMode,
  setTotal
} from '../../../features/siteSlice';
import { DisplayMode } from '../../../types/app/common';
import { useGetSiteCategoriesQuery } from '../../../services/sitesApi';
import { useSearchParams, Link } from 'react-router-dom';
import { GetCategoriesData } from '../../../types/api/category';
import {
  BlockResponseType,
  DownloadBlockFileRequest,
  getBlockDisplayRequestType,
  getSortedBlockBySiteCategoryRequestType
} from '../../../types/api/block';
import {
  useDownloadBlockFileMutation,
  useGetBlockDisplayListMutation,
  useGetSortedBlockBySiteCategoryMutation
} from '../../../services/blockApi';
import { Block } from '../../../types/app/block';
import { Category } from '../../../types/app/categories';
import BlockRegisterModal from '../../modals/BlockRegisterModal';
import { appRoute } from '../../../utils/routes';

const SiteHeader = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();

  const { themeColor } = useAppSelector((state) => state.persist.themeReducer);
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);
  const { selectedRowKeys, selectedBlockID, category } = useAppSelector(
    (state) => state.siteReducer
  );
  const { selectedSiteID } = useAppSelector((state) => state.persist.appReducer);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isSuccess, isLoading } = useGetSiteCategoriesQuery(selectedSiteID);
  const { siteBlockList, pageSize, currentPage } = useAppSelector((state) => state.siteReducer);

  const [getSortedList, {}] = useGetSortedBlockBySiteCategoryMutation();
  const [getBlockBlockList, {}] = useGetBlockDisplayListMutation();
  const [isRegisterModalOpen, setisRegisterModalOpen] = useState<boolean>(false);
  const [download, {}] = useDownloadBlockFileMutation();
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleDisplayModeChange = (value: string) => {
    dispatch(setSiteDisplayMode(value as DisplayMode));
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.result === 'success') {
        console.log(data.data);
        const newOption: Category[] = convertToOptions(data.data.children);
        dispatch(setCategory(newOption));
      }
    } else {
    }
  }, [data]);

  function convertToOptions(data: GetCategoriesData[]): any[] {
    return data.map((item) => ({
      value: item.category.code,
      label: item.category.name ?? '',
      children: item.children ? convertToOptions(item.children) : undefined
    }));
  }

  const handleCascader = (selectedKeys: string[]) => {
    if (!selectedKeys.length) return;
    const categoryId = selectedKeys[selectedKeys.length - 1];
    const request: getSortedBlockBySiteCategoryRequestType = {
      id: categoryId,
      offset: (currentPage - 1) * pageSize,
      deleted: 0,
      pagination: pageSize,
      siteId: selectedSiteID
    };
    getSortedList(request).then((res: any) => {
      if (res.error) {
        // message.error('ブロックリスト取得エラー');
      } else {
        const response = res.data as BlockResponseType;
        setBlock(response);
      }
    });
  };

  const resetBlockList = () => {
    const request: getBlockDisplayRequestType = {
      offset: (currentPage - 1) * pageSize,
      pagination: pageSize,
      sort: 'series',
      order: 'asc',
      deleted: 0,
      channelCd: 0
    };

    getBlockBlockList(request).then((res: any) => {
      if (res.error) {
        // message.error('ブロックリスト取得エラー');
      } else {
        const response = res.data as BlockResponseType;
        setBlock(response);
      }
    });
  };

  const setBlock = (blockRes: BlockResponseType) => {
    if (blockRes.result === 'success') {
      if (blockRes.data.length) {
        dispatch(setTotal(blockRes.total));

        let blockList: Block[] = [];
        blockRes.data.map((data) => {
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

        dispatch(setSiteBlockList(blockList));
      } else {
        dispatch(setTotal(0));
        dispatch(setSiteBlockList([]));
      }
    }
  };
  useEffect(() => {
    console.log(selectedRowKeys);
  }, [selectedRowKeys]);

  const handleDlButton = () => {
    console.log(selectedRowKeys);
    const nameList = selectedRowKeys.map((key, i) => {
      const name = siteBlockList.filter((item) => item.id === key)[0].name;

      return name ?? 'null';
    });
    console.log(nameList);
    const request: DownloadBlockFileRequest = {
      body: selectedRowKeys.map((item, i) => {
        return { prd_id: item as string };
      }),
      nameList
    };
    download(request).then((res: any) => {
      if (res.error) return;
      message.success('ファイルが正常にインポートされました。');
    });
  };

  const handleModalClose = () => {
    setisRegisterModalOpen(false);
    resetBlockList();
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        {/* left */}
        <div className="flex items-center">
          {/* title */}
          <div
            style={{ color: themeColor.gray[800] }}
            className=" md:text-2xl text-base font-semibold text-left pe-2  md:mb-0 truncate max-w-[120px] md:max-w-[500px]"
          >
            サイト名
          </div>

          {/* display mode switch */}
          <DisplayModeSwitchButton onChange={handleDisplayModeChange} />
        </div>

        {/* right */}
        <div>
          <Space>
            <Link to={appRoute.setting}>
              <Button
                size={screenSize.x > windowSize.md ? 'middle' : 'small'}
                icon={<SettingOutlined />}
              >
                サイト設定
              </Button>
            </Link>

            <Button type="primary" size={screenSize.x > windowSize.md ? 'middle' : 'small'}>
              プレビュー
            </Button>

            <Button
              icon={<PlusOutlined></PlusOutlined>}
              onClick={() => setisRegisterModalOpen(true)}
              type="primary"
            >
              新ブロック登録
            </Button>
            <BlockRegisterModal
              onClose={() => handleModalClose()}
              ModalProps={{
                open: isRegisterModalOpen,
                onCancel: () => setisRegisterModalOpen(false)
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

          <Button
            icon={<DownloadOutlined />}
            disabled={selectedRowKeys.length === 0}
            onClick={(e) => handleDlButton()}
            type="primary"
          ></Button>

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
                onChange={handleCascader}
                options={category}
                placeholder={'カテゴリーを選択'}
                onClear={() => {
                  resetBlockList();
                }}
              ></Cascader>
            </Tooltip>
          </ConfigProvider>
        </Space>
      </div>

      {/* modal */}
      <WithDrawBlockModal
        open={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      />
    </div>
  );
};

export default SiteHeader;

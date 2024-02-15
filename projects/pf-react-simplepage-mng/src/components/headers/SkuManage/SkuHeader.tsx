import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { DisplayModeSwitchButton } from '../..';
import { Button, ConfigProvider, Space, message } from 'antd';
import { windowSize } from '../../../utils/constant';
import { RotateLeftOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import PopconfirmButton from '../../buttons/PopconfirmButton';
import { setSkuDisplayMode } from '../../../features/blockDetailSlice';
import { DisplayMode } from '../../../types/app/common';
import { DownloadSkuFileRequest } from '../../../types/api/block';
import { useDownloadSkuFileMutation } from '../../../services/blockApi';
import SkuRegisterModal from '../../modals/SkuRegisterModal';
const SkuHeader = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------

  const { themeColor } = useAppSelector((state) => state.persist.themeReducer);
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);
  const { selectedRowKeys, blockDetail } = useAppSelector((state) => state.blockDetailReducer);
  const [download, {}] = useDownloadSkuFileMutation();
  const dispatch = useAppDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleDisplayModeChange = (value: string) => {
    dispatch(setSkuDisplayMode(value as DisplayMode));
  };
  const clickhandler = () => {
    const request: DownloadSkuFileRequest = {
      body: selectedRowKeys.map((item, i) => {
        return { prd_id: item as string };
      }),
      name: blockDetail.name
    };

    download(request).then((res: any) => {
      if (res.error) return;
      message.success('ファイルが正常にインポートされました');
    });
  };
  const handleClose = () => {
    setisModalOpen(false);
  };
  const handleClick = () => {
    setisModalOpen(true);
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <Space>
          <Button onClick={() => handleClick()} type="primary" icon={<PlusOutlined />}>
            商品の登録
          </Button>
          <Button
            size="middle"
            onClick={() => clickhandler()}
            disabled={selectedRowKeys.length === 0}
            type="primary"
            icon={<DownloadOutlined />}
          ></Button>
        </Space>
        <div className="flex items-center">
          {/* display mode switch */}
          <DisplayModeSwitchButton onChange={handleDisplayModeChange} />
        </div>
        <SkuRegisterModal
          onClose={() => handleClose()}
          ModalProps={{ open: isModalOpen, onCancel: () => setisModalOpen(false) }}
        ></SkuRegisterModal>
      </div>
    </div>
  );
};

export default SkuHeader;

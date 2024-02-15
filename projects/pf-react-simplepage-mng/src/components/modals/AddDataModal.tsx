import React from 'react';
import { Modal, Button, Card, Flex } from 'antd';
import { PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/store';

interface AddDataModalProps {
  visible: boolean;
  text: string;
  onClose: (val: boolean) => void;
  setIsSelfModalVisible: (val: boolean) => void;
  setIsFileModalVisible: (val: boolean) => void;
}

const AddDataModal = ({
  visible,
  text,
  onClose,
  setIsSelfModalVisible,
  setIsFileModalVisible
}: AddDataModalProps) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const themeColor = useAppSelector((state) => state.persist.themeReducer.themeColor);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleOk = () => {
    onClose(false);
  };

  const handleCancel = () => {
    onClose(false);
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Modal
      title={<div>{text}を作成する</div>}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      footer={null}
    >
      <Flex vertical gap="large">
        <Button
          icon={<PlusSquareOutlined />}
          size="large"
          block
          onClick={() => setIsSelfModalVisible(true)}
        >
          <span className="font-bold">自分で作成する：</span>
          {text}を手動で追加します
        </Button>
        <Button
          icon={<UploadOutlined />}
          size="large"
          block
          onClick={() => setIsFileModalVisible(true)}
        >
          <span className="font-bold">インポートする：</span>
          {text}をExcelからアップロードします
        </Button>
      </Flex>
    </Modal>
  );
};

export default AddDataModal;

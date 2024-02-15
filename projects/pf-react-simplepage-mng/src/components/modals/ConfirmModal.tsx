import React from 'react';
import { Modal } from 'antd';
import { useAppSelector } from '../../store/store';

interface ConfirmModalProps {
  visible: boolean;
  text: string;
  onClose: (val: boolean) => void;
  handleDelete: (val: boolean) => void;
}

const ConfirmModal = ({ visible, text, onClose, handleDelete }: ConfirmModalProps) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const themeColor = useAppSelector((state) => state.persist.themeReducer.themeColor);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleOk =  () => {
    handleDelete(true);
    onClose(false);
  };

  const handleCancel = () => {
    handleDelete(false);
    onClose(false);
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Modal title={<div>確認</div>} 
      open={visible} onOk={handleOk} onCancel={handleCancel} destroyOnClose okText="削除" cancelText="キャンセル">
      <p><span style={{color: themeColor.blue[600]}}>{text}</span>を削除しますか？</p>
    </Modal>
  );
};

export default ConfirmModal;
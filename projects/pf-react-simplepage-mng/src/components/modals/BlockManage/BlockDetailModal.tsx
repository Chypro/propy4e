import { Modal } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../store/store';

const BlockDetailModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { selectedBlockID } = useAppSelector((state) => state.siteReducer);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Modal width={1000} open={open} onOk={onClose} onCancel={onClose}>
      選択されたブロックID {selectedBlockID}
    </Modal>
  );
};

export default BlockDetailModal;

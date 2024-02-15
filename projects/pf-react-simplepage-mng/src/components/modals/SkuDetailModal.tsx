import { Modal, ModalProps } from 'antd';
import React from 'react';
import { useAppSelector } from '../../store/store';
type Props = {
  ModalProps?: ModalProps;
};
const SkuDetailModal = ({ ModalProps }: Props) => {
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);
  return (
    <>
      <Modal width={screenSize.x} {...ModalProps}>
        <h1>skuDetail</h1>
        <h1>skuDetail</h1>
        <h1>skuDetail</h1>
      </Modal>
    </>
  );
};

export default SkuDetailModal;

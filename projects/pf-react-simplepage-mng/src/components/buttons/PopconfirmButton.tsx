import {
  Button,
  ButtonProps,
  Modal,
  ModalProps,
  Popconfirm,
  PopconfirmProps,
  Tooltip,
  message
} from 'antd';
import React, { useState } from 'react';
type Props = {
  ButtonProps?: ButtonProps;
  tooltipLable?: string;
  PopconfirmProps?: PopconfirmProps;
  ModalProps?: ModalProps;
};
const PopconfirmButton = ({ ButtonProps, ModalProps, tooltipLable, PopconfirmProps }: Props) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  return (
    <div>
      <Tooltip title={tooltipLable}>
        <Popconfirm
          onConfirm={() => message.success('成功しました。')}
          onCancel={() => message.error('エラーが発生しました。')}
          okText="はい"
          cancelText="いいえ"
          title={undefined}
          {...PopconfirmProps}
        >
          {ModalProps && <Modal {...ModalProps}></Modal>}
          <Button title="ボタン" size="small" type="primary" {...ButtonProps}></Button>
        </Popconfirm>
      </Tooltip>
    </div>
  );
};

export default PopconfirmButton;

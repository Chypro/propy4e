import { List, Modal } from 'antd';
import React from 'react';

const WithdrawBlockModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Modal title="" open={open} onOk={onClose} onCancel={onClose}>
      <h2>サイトへの配信を停止</h2>
      {/* <h3>選択された{selectedRowKeys.length}つのブロックを任意のサイトへ配信します。</h3> */}
      {/* <List
        itemLayout="horizontal"
        dataSource={[]}
        renderItem={(item, i) => (
          <List.Item>
            <Checkbox onChange={(e) => sideCheckHandler({ e, itemKey: item })}></Checkbox>
            <div>{item}</div>
            <div></div>
          </List.Item>
        )}
      ></List> */}
    </Modal>
  );
};

export default WithdrawBlockModal;

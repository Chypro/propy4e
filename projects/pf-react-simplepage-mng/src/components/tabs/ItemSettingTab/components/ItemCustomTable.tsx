import { Button, Table, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Component, useState } from 'react';
import { ColumnGroupType, TableProps } from 'antd/es/table';
type DynamicTableType<T extends Record<string, any>> = {
  key: React.Key;
} & { [K in keyof T]: T[K] };
type Props = {
  TableProps: TableProps;
};
const ItemCustomTable = ({ TableProps }: Props) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  //   type dataWithKeyType = {key:React.Key}&{typeof data[0]}
  const { dataSource } = TableProps;
  const keys = dataSource && dataSource.length > 0 ? Object.keys(dataSource[0]) : [];
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>([]);
  const dataWithKey = dataSource.map((item, i) => ({
    key: i.toString() as React.Key,
    ...item
  }));
  //   type ColumnType = DynamicTableType<typeof data>;
  React.useEffect(() => {}, [selectedRowKeys]);
  //const columns = Object.keys(data[0]).map((key) => ({
  const columns = keys.map((key) => ({
    key,
    title: key,
    dataIndex: key
  }));

  const editColumn = {
    title: '編集',
    dataIndex: 'edit',
    key: 'edit',
    render: () => (
      <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick}>
        編集
      </Button>
    )
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setselectedRowKeys(newSelectedRowKeys);
  };

  const newColumns = [...columns, editColumn];

  const handleEditClick = () => {
    setIsEditModalVisible(true);
    // 他の処理を追加する場合はここに追加
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    // 他の処理を追加する場合はここに追加
  };

  return (
    <>
      <Table
        tableLayout="fixed"
        rowSelection={{ type: 'checkbox', selectedRowKeys, onChange: (e) => onSelectChange(e) }}
        dataSource={dataWithKey}
        columns={newColumns}
      ></Table>

      <Modal
        title="Edit Modal"
        visible={isEditModalVisible}
        onOk={handleEditModalClose}
        onCancel={handleEditModalClose}
      >
        {/* 編集モーダルの中身 */}
        {/* ここに編集モーダルの内容を追加 */}
      </Modal>
    </>
  );
};

export default ItemCustomTable;

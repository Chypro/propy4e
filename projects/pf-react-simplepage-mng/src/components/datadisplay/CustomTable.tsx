import { Button, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import * as React from 'react';
import ModalContainer from '../modals/ModalContainer';
import { Component, useState } from 'react';
import { LoginForm } from '..';
import { ColumnGroupType, TableProps } from 'antd/es/table';

type DynamicTableType<T extends Record<string, any>> = {
  key: React.Key;
} & { [K in keyof T]: T[K] };
interface Props<T> {
  data: DynamicTableType<T>[];
  onEditClick: (record: DynamicTableType<T>) => void;
}
const CustomTable = <T extends Record<string, any>>({ data, onEditClick }: Props<T>) => {
  //   type dataWithKeyType = {key:React.Key}&{typeof data[0]};
  const keys = data.length > 0 ? Object.keys(data[0]) : [];
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>([]);
  const dataWithKey = data.map((item, i) => ({
    key: i.toString() as React.Key,
    ...item
  }));
  const columns = keys.map((key) => ({
    key,
    title: key,
    dataIndex: key
  }));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setselectedRowKeys(newSelectedRowKeys);
  };

  const editColumn = {
    title: '編集',
    dataIndex: 'edit',
    key: 'edit',
    render: (text: any, record: any, index: number) => (
      <Button type="link" icon={<EditOutlined />} onClick={() => onEditClick(record)}>
        編集
      </Button>
    )
  };

  const newColumns = [...columns, editColumn];

  return (
    <>
      <Table
        tableLayout="fixed"
        rowSelection={{ type: 'checkbox', selectedRowKeys, onChange: (e) => onSelectChange(e) }}
        dataSource={dataWithKey}
        columns={newColumns}
      ></Table>
    </>
  );
};

export default CustomTable;

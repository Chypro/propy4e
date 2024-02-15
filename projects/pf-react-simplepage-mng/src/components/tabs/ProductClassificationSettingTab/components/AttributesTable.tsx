import { Table, Button, TableProps, Dropdown, MenuProps, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../store/store';
import { MoreOutlined } from '@ant-design/icons';
import { INPUT_TYPE_TO_STRING } from '../../../../utils/constant';

type Props = {
  TableProps: TableProps;
  handleEditModalOpen: (val: boolean, data: TableProps) => void;
};
const AttributesTable = ({ TableProps, handleEditModalOpen }: Props) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const themeColor = useAppSelector((state) => state.persist.themeReducer.themeColor);
  const { dataSource } = TableProps;
  const numToString = new Map([['0', '×'], ['1', '○']]);
  const keys = dataSource && dataSource.length > 0 ? Object.keys(dataSource[0]) : [];
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>([]);
  const dataWithKey = dataSource.map((item, i) => ({
    key: i.toString() as React.Key,
    ...item,
    入力タイプ: INPUT_TYPE_TO_STRING.get(item['入力タイプ']),
    共通項目: numToString.get(item['共通項目']),
    単位あり: numToString.get(item['単位あり']),
    固定項目: numToString.get(item['固定項目']),
    必須項目: numToString.get(item['必須項目']),
  }));
  const columns = keys.filter((key) => (key !== '表示項目')).map((key) => ({
    key,
    title: key,
    dataIndex: key,
    onCell: (record: TableProps) => {
      if (record['表示項目'] === '1'){
        return {
          style: { background: themeColor.gray[200] }
        };
      } 
    },
  }));

  const editColumn = {
    title: '',
    dataIndex: 'edit',
    key: 'edit',
    render: (_: any, record: TableProps) => {
      const items: MenuProps['items'] = [
        {
          key: '1',
          label: <div onClick={(e) => handleEditModalOpen(true, record)}>編集</div>
        },
      ];
      const isPrivate = record['表示項目'] === '1';
      return (
        <Space>
          {isPrivate && (
            <Button size="small">表示</Button>
          )}
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button size="small" icon={<MoreOutlined />}></Button>
          </Dropdown>
        </Space>
      );
    },
    onCell: (record: TableProps) => {
      if (record['表示項目'] === '1'){
        return {
          style: { background: themeColor.gray[200] }
        };
      } 
    }
  };
  //console.log('data :>> ', dataWithKey);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const selectedSitesList = newSelectedRowKeys.map((key: React.Key) =>{
      return dataWithKey.find((item) => item.key === key)
    })
    console.log('selectedRowKeys changed: >>', newSelectedRowKeys);
    setselectedRowKeys(newSelectedRowKeys);
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <>
      <Table
        tableLayout="fixed"
        onRow={(record, rowIndex) => {
          return {
          };
        }}
        rowSelection={{ 
          type: 'checkbox', selectedRowKeys, 
          onChange: (e) => onSelectChange(e),
          getCheckboxProps: record => ({
            //チェックボックスを非表示にする
            disabled: record['表示項目'] === '1',
          }), 
        }}
        dataSource={dataWithKey}
        columns={[...columns, editColumn]}
      ></Table>
    </>
  );
};

export default AttributesTable;
import { Table, Button, TableProps, MenuProps, Dropdown } from 'antd';
import React, { useState, useEffect } from 'react';
import { MoreOutlined } from '@ant-design/icons';
type Props = {
  TableProps: TableProps;
  handleClickRow: (val: TableProps) => void;
  setSelectedProductClassifications: (val: TableProps[]) => void;
  selectedProductClassifications : TableProps[];
  handleDeleteModalOpen: (val: boolean, data: TableProps) => void;
};
const ProductClassificationSettingTable = ({ TableProps, handleClickRow, setSelectedProductClassifications, selectedProductClassifications, handleDeleteModalOpen }: Props) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { dataSource } = TableProps;
  const keys = dataSource && dataSource.length > 0 ? Object.keys(dataSource[0]) : [];
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>([]);
  const dataWithKey = dataSource.map((item, i) => ({
    key: i.toString() as React.Key,
    ...item,
    作成日: item['作成日'].replace('T', ' '),
  }));
  const columns = keys.filter((key) => (key !== 'コード')).map((filteredKey) => (
    {
      filteredKey,
      title: filteredKey,
      dataIndex: filteredKey,
    }
  ));

  const editColumn = {
    title: '',
    dataIndex: 'edit',
    key: 'edit',
    render: (_: any, record: TableProps) => {
      const items: MenuProps['items'] = [
        {
          key: '1',
          label: <div onClick={(e) => handleDeleteModalOpen(true, record)}>削除</div>
        },
      ];
      return (
        <Dropdown menu={{ items }} placement="bottomRight">
          <Button size="small" icon={<MoreOutlined />}></Button>
        </Dropdown>
      );
    },
  };
  //console.log('data :>> ', dataWithKey);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    if(selectedProductClassifications.length === 0 && selectedRowKeys.length > 0 ){
      setselectedRowKeys([]);
    }
  }, [selectedProductClassifications]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const selectedProductClassificationsList = newSelectedRowKeys.map((key: React.Key) =>{
      return dataWithKey.find((item) => item.key === key)
    })
    console.log('selectedRowKeys changed: >>', newSelectedRowKeys);
    setselectedRowKeys(newSelectedRowKeys);
    console.log("選択された商品分類:>>", selectedProductClassificationsList);
    setSelectedProductClassifications(selectedProductClassificationsList);
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
            onClick: () => handleClickRow(record),
          };
        }}
        rowSelection={{ type: 'checkbox', selectedRowKeys, onChange: (e) => onSelectChange(e) }}
        dataSource={dataWithKey}
        columns={[...columns, editColumn]}
      ></Table>
    </>
  );
};

export default ProductClassificationSettingTable;
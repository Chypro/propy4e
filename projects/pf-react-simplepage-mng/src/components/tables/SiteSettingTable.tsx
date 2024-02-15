import { Table, Button, TableProps, Popover } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';
type Props = {
  TableProps: TableProps;
  handleClickRow: (val: TableProps) => void;
  setClickEditButton: (val: boolean, data: TableProps) => void;
  setSelectedSites: (val: TableProps[]) => void;
  selectedSites : TableProps[];
};
const SiteSettingTable = ({ TableProps, handleClickRow, setClickEditButton, setSelectedSites, selectedSites }: Props) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { dataSource } = TableProps;
  const [isHover, setIsHover] = useState<React.Key | null>(null);
  const keys = dataSource && dataSource.length > 0 ? Object.keys(dataSource[0]) : [];
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>([]);
  const dataWithKey = dataSource.map((item, i) => ({
    key: i.toString() as React.Key,
    ...item
  }));
  const columns = keys.map((key) => ({
    key,
    title: key,
    dataIndex: key,
  }));

  const editColumn = {
    title: '編集',
    dataIndex: 'edit',
    key: 'edit',
    render: (_: any, record: TableProps) => (
      <Button type="link" icon={<EditOutlined />} onClick={(e) => {e.stopPropagation(); setClickEditButton(true, record); console.log("clickEdit:>>", record)}}>
        編集
      </Button>
    )
  };
  //console.log('data :>> ', dataWithKey);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    if(selectedSites.length === 0 && selectedRowKeys.length > 0 ){
      setselectedRowKeys([]);
    }
  }, [selectedSites]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const selectedSitesList = newSelectedRowKeys.map((key: React.Key) =>{
      return dataWithKey.find((item) => item.key === key)
    })
    console.log('selectedRowKeys changed: >>', newSelectedRowKeys);
    setselectedRowKeys(newSelectedRowKeys);
    setSelectedSites(selectedSitesList);
  };

  const handleMouseEnter = (record: TableProps) => {
    setIsHover(record['key']);
  }

  const handleMouseLeave = (record: TableProps) => {
    setIsHover(null);
  }
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
            onMouseEnter: () => handleMouseEnter(record),
            onMouseLeave: () => handleMouseLeave(record),
          };
        }}
        rowSelection={{ type: 'checkbox', selectedRowKeys, onChange: (e) => onSelectChange(e) }}
        dataSource={dataWithKey}
        columns={[...columns, editColumn]}
      ></Table>
    </>
  );
};

export default SiteSettingTable;
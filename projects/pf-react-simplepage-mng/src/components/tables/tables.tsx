import React, { useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Form, Table } from 'antd';
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
  status: string;
}

interface CustomTableProps {
  externalData?: DataType[]; // New prop to accept external data
  columnNames?: ColumnsType<DataType>;
  //   onStatusCheckBoxChange: (
  //     statusCheckBox: boolean,
  //     selectedIndices: number[]
  //   ) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  externalData,
  columnNames
  //   onStatusCheckBoxChange,
}) => {
  const bordered = true;
  const size = 'large';
  const showHeader = true;
  const bottom = 'bottomRight';
  const ellipsis = false;
  const yScroll = true;
  const tableLayout = 'fixed';

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  //   const handleRowSelectionChange = (
  //     selectedRowKeys: React.Key[],
  //     selectedRows: DataType[]
  //   ) => {
  //     setSelectedRowKeys(selectedRowKeys.map(Number));
  //     const selectedIndices = selectedRows.map(
  //       (row) => externalData?.findIndex((item) => item.key === row.key) || -1
  //     );
  //     onStatusCheckBoxChange(selectedRowKeys.length > 0, selectedIndices);
  //   };

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 450;
  }

  const tableColumns = columnNames?.map((item) => ({ ...item, ellipsis })) || [];

  tableColumns[0].fixed = true;
  tableColumns[tableColumns.length - 1].fixed = 'right';

  const tableProps: TableProps<DataType> = {
    bordered,
    size,
    showHeader,
    tableLayout,
    scroll
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: handleRowSelectionChange,
    // },
  };

  return (
    <>
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{ marginBottom: 16 }}
      ></Form>
      <Table
        {...tableProps}
        pagination={{ position: [bottom] }}
        columns={tableColumns}
        dataSource={externalData || []}
      />
    </>
  );
};

export default CustomTable;

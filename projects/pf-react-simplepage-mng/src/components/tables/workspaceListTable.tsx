import React, { useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Form, Table } from 'antd';
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface WorkSpaceDataType {
  id: number;
  workspaceName: string;
  member: String;
  group: string;
}

interface CustomTableWorkSpaceProps {
  externalData?: WorkSpaceDataType[]; // New prop to accept external data
  columnNames?: ColumnsType<WorkSpaceDataType>;
}

const WorkSpaceDataType: React.FC<CustomTableWorkSpaceProps> = ({
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

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 450;
  }

  const tableColumns = columnNames?.map((item) => ({ ...item, ellipsis })) || [];

  tableColumns[0].fixed = true;
  tableColumns[tableColumns.length - 1].fixed = 'right';

  const tableProps: TableProps<WorkSpaceDataType> = {
    bordered,
    size,
    showHeader,
    tableLayout,
    scroll
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

export default WorkSpaceDataType;

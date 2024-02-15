// UserTable.tsx
import React, { useState } from 'react';
import { Table, Button } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { Form } from 'antd';
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
import { MdMoreHoriz } from 'react-icons/md';
import { Menu, Dropdown, Modal } from 'antd';

interface RollData {
  checkboxStates: boolean[][];
  roleName: string;
}

interface RoleDataType {
  id: number;
  name: String;
  role: String;
  data: RollData;
}

interface RollTableProps {
  externalData?: RoleDataType[]; // New prop to accept external data
  columnNames?: ColumnsType<RoleDataType>;
  onRemoveUser?: (id: number, operation: string) => void;
}

const RollTable: React.FC<RollTableProps> = ({ externalData, columnNames, onRemoveUser }) => {
  const bordered = true;
  const size = 'large';
  const showHeader = true;
  const bottom = 'bottomRight';
  const ellipsis = false;
  const yScroll = true;
  const tableLayout = 'fixed';

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<RoleDataType | null>(null);
  const showModal = (record: RoleDataType) => {
    setModalVisible(true);
    setSelectedRecord(record);
  };

  const handleEditOrDelete = (operation: string) => {
    if (selectedRecord && onRemoveUser) {
      console.log(`${operation} clicked for row with ID:`, selectedRecord.id);
      onRemoveUser(selectedRecord.id, operation);
    } else if (selectedRecord && !onRemoveUser) {
      console.log(`${operation} clicked for row with ID:`, selectedRecord.id);
    }
    setModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleEditOrDelete('edit')}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleEditOrDelete('delete')}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 450;
  }

  const tableColumns = columnNames?.map((item) => ({ ...item, ellipsis })) || [];

  tableColumns[0].fixed = true;
  tableColumns[tableColumns.length - 1].fixed = 'right';

  const tableProps: TableProps<RoleDataType> = {
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
        columns={[
          ...tableColumns,
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Dropdown overlay={menu} trigger={['click']}>
                <MdMoreHoriz
                  onClick={(e) => {
                    e.stopPropagation();
                    showModal(record);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </Dropdown>
            )
          }
        ]}
        dataSource={externalData || []}
      />
    </>
  );
};

export default RollTable;

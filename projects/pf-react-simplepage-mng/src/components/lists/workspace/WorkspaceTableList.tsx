import React, { useEffect, useState } from 'react';
import {
  ConfigProvider,
  Input,
  Modal,
  Skeleton,
  Table,
  TableColumnsType,
  Space,
  Button,
  Menu,
  Dropdown
} from 'antd';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../store/store';

const WorkspaceListTableList = ({ isLoading }: { isLoading: boolean }) => {
  type DataType = {
    key: string;
    id: string;
    workspaceName: string;
    member: number;
  };

  const columnIndex = {
    key: '',
    id: 'id',
    workspaceName: 'workspaceName',
    member: 'member'
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [newName, setNewName] = useState<string>('');

  useEffect(() => {
    let dataList: DataType[] = [];
    // Sample data
    dataList.push({
      key: '1',
      id: '123123',
      workspaceName: 'ワークスペース名１',
      member: 20
    });
    dataList.push({
      key: '2',
      id: '12312asdasdwq',
      workspaceName: 'ワークスペース名２',
      member: 999
    });
    setDataSource(dataList);
  }, []);

  const handleOpenWorkspace = (record: DataType) => {
    console.log(`Open workspace ${record.workspaceName}`);
  };

  const handleNameChange = (record: DataType) => {
    Modal.confirm({
      title: 'Change Workspace Name',
      content: (
        <Input defaultValue={record.workspaceName} onChange={(e) => setNewName(e.target.value)} />
      ),
      onOk: () => {
        setDataSource((prevDataSource) =>
          prevDataSource.map((item) =>
            item.key === record.key ? { ...item, workspaceName: newName } : item
          )
        );
        // Reset newName state after updating the dataSource
        setNewName('');
      }
    });
  };

  const handleDeleteWorkspace = (record: DataType) => {
    // Add logic to handle workspace deletion
    console.log(`Delete workspace ${record.workspaceName}`);
  };

  const ActionMenu = ({ record }: { record: DataType }) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleOpenWorkspace(record)}>
        Open Workspace
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleNameChange(record)}>
        Change Workspace Name
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleDeleteWorkspace(record)}>
        Delete Workspace
      </Menu.Item>
    </Menu>
  );

  const CustomMenu = ({ record }: { record: DataType }) => (
    <Dropdown overlay={<ActionMenu record={record} />} trigger={['click']}>
      <EllipsisOutlined style={{ fontSize: 18, color: '#1890ff', cursor: 'pointer' }} />
    </Dropdown>
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: columnIndex.id,
      ellipsis: true
    },
    {
      title: 'ワークスペース名',
      dataIndex: columnIndex.workspaceName,
      ellipsis: true
    },
    {
      title: 'メンバー数',
      dataIndex: columnIndex.member,
      sorter: (a, b) => a.member - b.member,
      ellipsis: true
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <CustomMenu record={record} />
        </span>
      )
    }
  ];

  if (isLoading) {
    return (
      <div>
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  return (
    <ConfigProvider>
      <Table dataSource={dataSource} columns={columns} />
    </ConfigProvider>
  );
};

export default WorkspaceListTableList;

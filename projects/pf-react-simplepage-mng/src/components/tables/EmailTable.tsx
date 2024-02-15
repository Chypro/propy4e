import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef } from 'antd';
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Checkbox,
  Radio,
  Space,
  notification,
  Progress
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { RadiusBottomleftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Switch, Menu, Row, Col } from 'antd';

interface EmailTableProps {
  modalStatus: boolean;
  disableModal: (status: boolean) => void;
}

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: React.Key;
  email: string;
  role: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  handleRoleEdit: (key: React.Key) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  handleRoleEdit,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          onFocus={() => form.setFieldsValue({ [dataIndex]: '' })} // Clear placeholder on focus
        />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  const handleInputChange = (value: string) => {
    setEmail(value);
  };

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  email: string;
  role: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EmailTable: React.FC<EmailTableProps> = ({ modalStatus, disableModal }) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [count, setCount] = useState(2);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleRoleEdit = (key: any) => {
    setSelectedRowKey(key);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedRowKey(null);
  };

  const handleModalOk = () => {
    setModalVisible(false);
  };

  const roleOptions = ['Admin', 'User', 'Guest'];

  const handleRoleSelect = (selectedRole: string) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => item.key === selectedRowKey);
    if (index !== -1) {
      newData[index].role = selectedRole;
      setDataSource(newData);
    }
  };

  const modalContent = (
    <Radio.Group onChange={(e) => handleRoleSelect(e.target.value)}>
      <Space direction="vertical">
        {roleOptions.map((role) => (
          <Radio key={role} value={role}>
            {role}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );

  const defaultcolumns = [
    {
      title: 'email',
      dataIndex: 'email',
      width: '30%',
      editable: true
    },
    {
      title: 'role',
      dataIndex: 'role',
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <a onClick={() => handleRoleEdit(record.key)}>{record.role}</a>
        ) : null
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <span>
            <a onClick={() => handleDelete(record.key)}>
              <CloseOutlined style={{ color: 'red' }} />
            </a>
          </span>
        ) : null
    }
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      email: 'メールアドレスを入力',
      role: 'Select role'
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setDataSource(newData);
  };

  const columns = defaultcolumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        handleRoleEdit
      })
    };
  });

  const SuccessNotification = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const simulateProgress = () => {
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 10;
          setProgress(currentProgress);
          if (currentProgress > 100) {
            clearInterval(interval);
            notification.destroy('successNotification');
          }
        }, 100);
      };

      simulateProgress();
    }, []);

    return (
      <>
        <Progress percent={progress} status="success" showInfo={false} style={{ height: '10px' }} />
        <div></div>
      </>
    );
  };

  const openNotification = (placement: any) => {
    notification.success({
      message: 'Invitation Users Successfuly',
      key: 'successNotification',
      duration: 0,
      description: <SuccessNotification />,
      placement
    });
  };

  const openNotificationError = (placement: any) => {
    notification.success({
      message: 'Invitation Users',
      key: 'Email not Send SuccuessFully',
      duration: 0,
      description: <SuccessNotification />,
      placement
    });
  };

  const handleCnacel = () => {
    console.log('status:', modalStatus);
    if (modalStatus == true) {
      disableModal(false);
    } else {
      disableModal(true);
    }
  };

  const handleKeep = () => {
    handleCnacel();
    fetch('http://127.0.0.1:5000/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataSource)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data);

        // Access the status list
        const statusList: boolean[] = data.status_list;

        // Handle the statusList as needed
        statusList.forEach((status, index) => {
          if (status) {
            console.log(`Email ${index + 1} sent successfully`);
          } else {
            console.error(`Error sending email ${index + 1}`);
          }
        });

        const anyFalse = statusList.some((status) => !status);
        if (!anyFalse) {
          openNotification('bottomLeft');
        } else {
          openNotificationError('bottomLeft');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        openNotificationError('bottomLeft');
      });
  };

  const isKeepButtonDisabled =
    dataSource.some(
      (item) => item.email === 'メールアドレスを入力' || item.role === 'Select role'
    ) || dataSource.length === 0;

  const menuList = ['Admin', 'developer', 'srv', 'test'];
  const initialCheckboxStates: boolean[] = menuList.map(() => false);

  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(initialCheckboxStates);

  const handleCheckboxChange = (itemIndex: number, checked: boolean) => {
    const updatedStates = Array(menuList.length).fill(false);
    updatedStates[itemIndex] = checked;
    handleRoleSelect(menuList[itemIndex]);
    setCheckboxStates(updatedStates);
  };

  const [filteredMenuList, setFilteredMenuList] = useState<string[]>(menuList);

  useEffect(() => {
    setFilteredMenuList(filteredMenuList);
  }, [filteredMenuList]);

  const handleSearchChange = (searchValue: string) => {
    const filteredList = menuList.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredMenuList(filteredList);
  };

  function handleInputChange(value: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell
          }
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '30px',
          borderTop: '1px solid rgb(218, 214, 214)',
          padding: '10px'
        }}
      >
        <Button onClick={() => handleAdd()} style={{ backgroundColor: 'whitesmoke' }}>
          Add a row
        </Button>

        <Button
          onClick={() => handleCnacel()}
          style={{
            backgroundColor: 'whitesmoke',
            marginLeft: '69%'
          }}
        >
          cancel
        </Button>

        <Button
          onClick={(record) => handleKeep()}
          style={{ backgroundColor: 'whitesmoke', marginLeft: '1%' }}
          disabled={isKeepButtonDisabled}
        >
          keep
        </Button>
      </div>
      <Modal
        title="Select Role"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <div>
          {' '}
          <Input
            placeholder="メールアドレスを入力"
            value=""
            onChange={(e) => handleInputChange(e.target.value)}
            style={{ marginTop: '10px', marginBottom: '10px' }}
          />
        </div>
        {menuList.map((menuItem, index) => (
          <div key={`menuItem_${index}`}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <div style={{ width: '80%', marginLeft: '10%' }}>{menuItem}</div>
              <div
                style={{
                  width: '3%'
                }}
              >
                <Checkbox
                  checked={checkboxStates[index]}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                />
              </div>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default EmailTable;
function setEmail(value: string) {
  throw new Error('Function not implemented.');
}

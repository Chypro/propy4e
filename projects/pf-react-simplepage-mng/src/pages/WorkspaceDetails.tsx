import React, { useEffect, useState } from 'react';
import { ProtectedRoute } from '../components';
import { useAppSelector } from '../store/store';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { GoPlus } from 'react-icons/go';
import { Form, Input, Button, Space, Result } from 'antd';
import WorkSpaceListTable from '../components/tables/workspaceListTable';
import type { GetProp, TableProps } from 'antd';
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
import { Modal } from 'antd';
import { apiRoute, appRoute } from '../utils/routes';

import { useLocation } from 'react-router-dom'; // Import useLocation

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UserTable from '../components/tables/UserTable';
import RoleTable from '../components/tables/RoleTable';
import { TbDots } from 'react-icons/tb';
import EmailTable from '../components/tables/EmailTable';
import RoleMangement from '../components/forms/RoleManagement';
import RoleSelectionModal from '../components/tables/RoleSelectionModal';

interface UserDateType {
  id: number;
  login: string;
  surname: string;
  givenName: string;
  administator: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const onChange = (key: string) => {
  console.log(key);
};

interface WorkspaceDetailsProps {
  // state: { workspace: WorkSpaceDataType };
}

interface WorkSpaceDataType {
  id: number;
  workspaceName: string;
  member: String;
  group: string;
}

interface RoleData {
  checkboxStates: boolean[][];
  roleName: string;
}

const columns: ColumnsType<UserDateType> = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'login',
    dataIndex: 'login'
  },
  {
    title: 'surname',
    dataIndex: 'surname'
  },
  {
    title: 'givenName',
    dataIndex: 'givenName'
  },
  {
    title: 'administator',
    dataIndex: 'administator'
  }
];

interface RoleDataType {
  id: number;
  name: String;
  role: String;
  data: RoleData;
}

const rolecolumns: ColumnsType<RoleDataType> = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'name',
    dataIndex: 'name'
  },
  {
    title: 'role',
    dataIndex: 'role'
  }
];

const WorkspaceDetails: React.FC<WorkspaceDetailsProps> = () => {
  const [tableData, setTableData] = useState<any[]>([]); // Change the type accordingly

  const [dummyData, setDummyData] = useState<UserDateType[]>([
    {
      id: 1,
      login: 'test 001',
      surname: '001',
      givenName: 'test',
      administator: 'Yes'
    },
    {
      id: 2,
      login: 'test 002',
      surname: '002',
      givenName: 'test',
      administator: 'No'
    }
  ]);

  const findIndexById = (idToFind: number): number => {
    return roleDummyData.findIndex((item) => item.id === idToFind);
  };

  const findIndexByIduser = (idToFind: number): number => {
    return dummyData.findIndex((item) => item.id === idToFind);
  };

  const [roleDummyData, SetRoleDummyData] = useState<RoleDataType[]>([
    {
      id: 1,
      name: 'test_role 01',
      role: 'SMM',
      data: {
        checkboxStates: [
          [true, true, true],
          [true, true, true, true],
          [true, true, true, true, true]
        ],
        roleName: 'Doe'
      }
    },
    {
      id: 2,
      name: 'test_role 02',
      role: 'Advertiser',
      data: {
        checkboxStates: [
          [true, true, true],
          [true, true, true, true],
          [true, true, true, true, true]
        ],
        roleName: 'Doe'
      }
    }
  ]);

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const [selectedOption, setSelectedOption] = useState('user');

  const handleButtonClick = (key: string) => {
    if (key == '1') {
      setSelectedOption('user');
    } else if (key == '2') {
      setSelectedOption('role');
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const onFinish = (values: any) => {};

  const [form] = Form.useForm();

  const showForm = () => {
    setFormVisible(true);
  };
  const [indexId, setIndexId] = useState<number>(-1);

  const handleRemoveUser = (idToRemove: number, operation: string) => {
    if (operation == 'delete') {
      if (selectedOption == 'user') {
        const updatedData = dummyData.filter((user) => user.id !== idToRemove);
        setDummyData(updatedData);
      } else {
        const updatedData = roleDummyData.filter((user) => user.id !== idToRemove);
        SetRoleDummyData(updatedData);
      }
    } else {
      setIndexId(idToRemove);
      setFormVisible(true);
    }
  };

  const [emailModal, setEmailModal] = useState(true);

  const handleEmailModal = (status: boolean) => {
    setEmailModal(status);
    setFormVisible(false);
  };

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const handleKeep = (dataFromTable: any) => {
    setTableData(dataFromTable);
    closeForm();
  };

  const [dataUpdated, setDataUpdated] = useState(false);

  const handleRoleManagementClose = (data: any, roleVisibilityout: any) => {
    const index: number = findIndexByIduser(indexId);
    if (data != null && indexId == -1) {
      SetRoleDummyData((prevRoleDummyData) => [
        ...prevRoleDummyData,
        {
          id: prevRoleDummyData.length + 1,
          name: data.roleName,
          role: data.roleName,
          data: data
        }
      ]);
    } else if (data != null && indexId != -1) {
      const index: number = findIndexById(indexId);
      // SetRoleDummyData((prevRoleDummyData) => {
      //   const updatedData = [...prevRoleDummyData];
      //   updatedData[index] = {
      //     id: indexId,
      //     name: data.roleName,
      //     role: data.roleName,
      //     data: data,
      //   };
      //   return updatedData;
      // });

      const updatedData = roleDummyData.filter((user) => user.id !== indexId);
      SetRoleDummyData(updatedData);

      SetRoleDummyData((prevRoleDummyData) => [
        ...prevRoleDummyData,
        {
          id: indexId,
          name: data.roleName,
          role: data.roleName,
          data: data
        }
      ]);
      setDataUpdated(true);
    }
    setIndexId(-1);
    setFormVisible(roleVisibilityout);
  };

  const onKeep = (result: string) => {
    if (result != '') {
      const index: number = findIndexByIduser(indexId);
      setDummyData((prevDummyData) => {
        const updatedData = [...prevDummyData];
        updatedData[index] = {
          id: indexId,
          login: dummyData[index].login,
          surname: dummyData[index].surname,
          givenName: dummyData[index].givenName,
          administator: result
        };
        return updatedData;
      });
    }
    setIndexId(-1);
    setFormVisible(false);
  };

  const ModalRoleandUser = () => {
    return (
      <div>
        <button
          className="header-button"
          onClick={showForm}
          style={{
            background: 'rgb(0,0,0,0.02)',
            border: 'none'
            // padding: "10px",
          }}
        >
          <span
            style={{
              marginRight: '10px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <GoPlus />
          </span>

          {selectedOption === 'user' ? (
            <span>Invites users to your workspace</span>
          ) : (
            <span>Add role to workspace</span>
          )}
        </button>
      </div>
    );
  };

  const [data, setData] = useState<null | RoleDataType[]>(null);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'User',
      children: (
        <div>
          <div>
            <ModalRoleandUser />
          </div>
          <UserTable
            externalData={dummyData}
            columnNames={columns}
            onRemoveUser={handleRemoveUser}
          />
        </div>
      )
    },
    {
      key: '2',
      label: 'Role',
      children: (
        <div>
          <ModalRoleandUser />
          <RoleTable
            externalData={roleDummyData}
            columnNames={rolecolumns}
            onRemoveUser={handleRemoveUser}
          />
        </div>
      )
    }
  ];
  React.useEffect(() => {
    console.log('roleDummyData', roleDummyData);
  }, [dummyData, emailModal, roleDummyData, dataUpdated, indexId]);

  const menuList = ['Admin', 'developer', 'srv', 'test'];
  const initialCheckboxStates: boolean[] = menuList.map(() => false);

  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(initialCheckboxStates);

  // useEffect(() => {
  //   console.log("role updated data:", RoleDummyData);
  // }, [dummyData, emailModal, RoleDummyData, dataUpdated, indexId]);

  useEffect(() => {
    console.log('role updated data:', roleDummyData);
    setData(roleDummyData);
  }, [roleDummyData, dataUpdated, roleDummyData]);

  return (
    <div
      style={{
        backgroundColor: 'whitesmoke',
        color: themeColor.gray[700],
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '2rem'
      }}
      className="w-full h-full"
    >
      <div
        style={{
          backgroundColor: themeColor.gray[100],
          color: themeColor.gray[700]
        }}
        className="w-full h-full flex justify-center items-center text-2xl"
      >
        <div style={{ width: '96%', height: '98%' }}>
          <Tabs defaultActiveKey="1" items={items} onChange={(key) => handleButtonClick(key)} />
        </div>
      </div>

      {formVisible && selectedOption === 'user' && indexId == -1 && (
        <Modal
          title="Invite to WorkSpace-3"
          open={formVisible}
          onCancel={() => setFormVisible(false)}
          footer={null}
          width={800}
        >
          <EmailTable modalStatus={emailModal} disableModal={handleEmailModal} />
        </Modal>
      )}

      {formVisible && selectedOption === 'user' && indexId != -1 && (
        <RoleSelectionModal
          menuList={menuList}
          data={dummyData[indexId]}
          visible={true}
          onKeep={onKeep}
        />
      )}

      {formVisible && selectedOption === 'role' && (
        <RoleMangement
          onClose={handleRoleManagementClose}
          dataForRole={roleDummyData[indexId]}
          roleVisibilityIn={formVisible}
        />
      )}
    </div>
  );
};

export default WorkspaceDetails;

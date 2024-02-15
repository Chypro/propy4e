import {
  Avatar,
  Card,
  ConfigProvider,
  Skeleton,
  Tooltip,
  Dropdown,
  Menu,
  Modal,
  Input
} from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import { AiOutlineEllipsis, AiOutlineSetting, AiOutlineEdit } from 'react-icons/ai';
import { LuWorkflow } from 'react-icons/lu';
import { FaUsers } from 'react-icons/fa';
import { useAppSelector } from '../../store/store';
import { Workspace } from '../../types/app/workspace';
import { useNavigate } from 'react-router-dom';
import { appRoute } from '../../utils/routes';
import { useDispatch } from 'react-redux';
import { setSelectedWorkspaceDomain } from '../../features/appSlice';
import { useGetSiteListQuery } from '../../services/sitesApi';

const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const [isHover, setIsHover] = useState<boolean>(false);

  const { data: sites } = useGetSiteListQuery();

  const [newName, setNewName] = useState<string>(workspace.name);


  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleCardClick = () => {
    dispatch(setSelectedWorkspaceDomain(workspace.domain));
    if (sites.data.length === 0) {
      navigate(appRoute.home);
    } else {
      navigate(appRoute.media);
    }
  };

  const handleRenameWorkspace = () => {
    Modal.confirm({
      title: 'Rename Workspace',
      content: <Input defaultValue={workspace.name} onChange={(e) => setNewName(e.target.value)} />,
      onOk: () => {
        // Replace the console.log statement with the logic to rename the workspace
        console.log(`Renaming workspace ${workspace.name} to ${newName}`);
      }
    });
  };

  const handleDeleteWorkspace = () => {
    Modal.confirm({
      title: 'Delete Workspace',
      content: `Are you sure you want to delete ${workspace.name}?`,
      onOk: () => {
        // Replace the console.log statement with the logic to delete the workspace
        console.log(`Deleting workspace ${workspace.name}`);
      }
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleRenameWorkspace}>
        Rename Workspace
      </Menu.Item>
      <Menu.Item key="2" onClick={handleDeleteWorkspace}>
        Delete Workspace
      </Menu.Item>
    </Menu>
  );

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            actionsLiMargin: '0',
            tabsMarginBottom: 0,
            colorBorderSecondary: isHover
              ? themeColor[primaryColor][300]
              : themeColor[primaryColor][100]
          }
        }
      }}
    >
      <Card
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={handleCardClick}
        style={{ width: '100%', marginTop: 8, cursor: 'pointer' }}
        actions={[
          <Tooltip title="Edit">
            <AiOutlineEdit key="edit" size={19} onClick={handleRenameWorkspace} />
          </Tooltip>,
          <Tooltip title="Settings">
            <AiOutlineSetting key="setting" size={19} />
          </Tooltip>,
          <Dropdown overlay={menu} trigger={['click']}>
            <AiOutlineEllipsis key="ellipsis" size={19} />
          </Dropdown>
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            title={
              <div className="flex">
                <div>
                  <LuWorkflow size={19} />
                </div>
                <div className="truncate -mt-1">
                  <div>{workspace.name}</div>
                  <div className="text-sm ms-1 font-light">{workspace.id}</div>
                </div>
              </div>
            }
            description={
              <div
                style={{
                  color: themeColor.gray[700]
                }}
                className=" w-full h-[60px] flex justify-around items-center"
              >
                <FaUsers size={50} color={themeColor[primaryColor][300]} />
                <div className="h-full flex items-center text-2xl font-semibold">
                  {workspace.memberCount}
                </div>
              </div>
            }
          />
        </Skeleton>
      </Card>
    </ConfigProvider>
  );
};

export default WorkspaceCard;

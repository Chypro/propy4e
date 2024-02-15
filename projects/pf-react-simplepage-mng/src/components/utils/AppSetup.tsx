import { Progress } from 'antd';
import React, { useEffect } from 'react';
import styles from '../../css/spinLoader.module.css';
import { useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { GetWorkspaceListResponse, GetWorkspaceUserListResponse } from '../../types/api/workspace';
import { addWorkspace, emptyWorkspaceList } from '../../features/workspaceSlice';
import {
  useGetWorkspaceListMutation,
  useGetWorkspaceUserListMutation
} from '../../services/workspaceApi';
import { Workspace } from '../../types/app/workspace';

const AppSetup = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();

  const { themeColor, primaryColor, isDarkMode } = useAppSelector(
    (state) => state.persist.themeReducer
  );
  const { workspaceListResponse } = useAppSelector((state) => state.workspaceReducer);

  const [getWorkspaceUserList, { isLoading: getWorkspaceUserListLoading }] =
    useGetWorkspaceUserListMutation();
  const [getWorkspaceList, { isLoading: getWorkspaceListLoading }] = useGetWorkspaceListMutation();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const getWorkspaceDetail = (data: GetWorkspaceListResponse) => {
    console.log('get work space detail');
    // empty workspace list state

    dispatch(emptyWorkspaceList());

    data.data.map((d) => {
      // call get workspace user list apid
      // different domain has different member list
      getWorkspaceUserList(d.domain).then((res: any) => {
        console.log('res :>> ', res);
        if (res.error) {
          console.log('get workspace user list error :>> ', res.error);
        } else {
          const response = res.data as GetWorkspaceUserListResponse;
          if (response.result === 'success') {
            // create new worksapce object
            const workspace: Workspace = {
              id: d.id,
              code: d.code,
              name: d.name,
              domain: d.domain,
              userUuid: d.user_uuid,
              mode: d.mode,
              memberCount: 0,
              members: []
            };

            console.log('response :>> ', response.data);
            // map the member array and push to workspace.member
            response.data.map((member) => {
              console.log('member :>> ', member);
              workspace.members.push({
                id: member.id,
                userUuid: member.user_uuid,
                admin: member.admin,
                valid: member.valid,
                userName: member.username,
                firstName: member.firstname,
                lastName: member.lastname
              });
              workspace.memberCount += 1;
            });

            // push workspace to workspaceList
            dispatch(addWorkspace(workspace));
            // workspaceList = [...workspaceList, workspace];
          }
        }
      });
    });

    // setIsLoading(false);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--lds-roller-color', themeColor[primaryColor][200]);
    document.documentElement.style.setProperty(
      '--theme-primary-color',
      themeColor[primaryColor][200]
    );
    document.documentElement.style.setProperty('--theme-gray-color', themeColor.gray[600]);
  }, [primaryColor, isDarkMode]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--theme-gray-color',
      isDarkMode ? themeColor.gray[200] : themeColor.gray[400]
    );
  }, [isDarkMode]);

  useEffect(() => {
    if (workspaceListResponse) {
      getWorkspaceDetail(workspaceListResponse);
    } else {
      getWorkspaceList().then((getWorkspaceResult: any) => {
        if (getWorkspaceResult.error) {
          console.log('get workspace list error :>> ', getWorkspaceResult);
        } else {
          const getWorkspaceListResponse = getWorkspaceResult.data as GetWorkspaceListResponse;
          getWorkspaceDetail(getWorkspaceListResponse);
        }
      });
    }
  }, [workspaceListResponse]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  // if (getWorkspaceUserListLoading || getWorkspaceListLoading) {
  //   return (
  //     <div
  //       style={{ backgroundColor: themeColor.gray[50] }}
  //       className="absolute top-0 left-0 w-screen h-screen z-[9999] flex justify-center items-center"
  //     >
  //       <div className={styles['lds-roller']}>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //       </div>
  //     </div>
  //   );
  // }

  return <></>;
};

export default AppSetup;

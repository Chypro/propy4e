import React from 'react';
import { WorkspaceCard, WorkspaceCardSkeleton } from '../..';
import { ConfigProvider } from 'antd';
import { useAppSelector } from '../../../store/store';

const WorkspaceGridList = ({ isLoading }: { isLoading: boolean }) => {
  const { workspaceList, selectedWorkspaceID } = useAppSelector((state) => state.workspaceReducer);

  if (isLoading) {
    return (
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-6 md:col-span-2 xl:col-span-1">
          <WorkspaceCardSkeleton />
        </div>
        <div className="col-span-6 md:col-span-2 xl:col-span-1">
          <WorkspaceCardSkeleton />
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-6 gap-2">
        {workspaceList.map((workspace) => (
          <div key={workspace.id} className="col-span-6 md:col-span-2 xl:col-span-1">
            <WorkspaceCard workspace={workspace} />
          </div>
        ))}
      </div>
    );
  }
};

export default WorkspaceGridList;

import { useState } from 'react';
import { useAppSelector } from '../store/store';
import { Button } from 'antd';
import { TfiLayoutGrid2, TfiLayoutListThumb } from 'react-icons/tfi';
import { DisplayMode } from '../types/app/common';
import WorkspaceGridList from '../components/lists/workspace/WorkspaceGridList';
import WorkspaceTableList from '../components/lists/workspace/WorkspaceTableList';
import { ProtectedRoute } from '../components';

const WorkspacePage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);

  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleDisplayModeChange = (value: DisplayMode) => {
    setDisplayMode(value);
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ProtectedRoute>
      <div
        style={{ backgroundColor: themeColor.gray[50], color: themeColor.gray[700] }}
        className="w-full h-full p-4"
      >
        <div className="w-full flex flex-wrap items-center mb-1 md:p-1">
          {/* title */}
          <div
            style={{ color: themeColor.gray[800] }}
            className=" md:text-2xl text-base font-semibold text-left pe-2 mb-1 md:mb-0"
          >
            参加可能なワークスペース
          </div>

          <div className="flex space-x-2 ">
            <Button
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              icon={<TfiLayoutGrid2 size={19} style={{ marginLeft: 1 }} />}
              onClick={() => handleDisplayModeChange('grid')}
            ></Button>
            <Button
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              icon={<TfiLayoutListThumb size={19} style={{ marginLeft: 1 }} />}
              onClick={() => handleDisplayModeChange('table')}
            ></Button>
          </div>
        </div>

        {displayMode === 'grid' && <WorkspaceGridList isLoading={false} />}
        {displayMode === 'table' && <WorkspaceTableList isLoading={false} />}
      </div>
    </ProtectedRoute>
  );
};

export default WorkspacePage;

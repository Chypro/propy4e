import React from 'react';
import { useAppSelector } from '../../store/store';
import { Card, ConfigProvider, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';

const WorkspaceCardSkeleton = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
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
            colorBorderSecondary: themeColor[primaryColor][100]
          }
        }
      }}
    >
      <Card style={{ width: '100%', marginTop: 8 }}>
        <Skeleton loading={true} avatar active>
          <Meta />
        </Skeleton>
      </Card>
    </ConfigProvider>
  );
};

export default WorkspaceCardSkeleton;

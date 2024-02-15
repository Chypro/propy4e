import React from 'react';
import { useAppSelector } from '../../store/store';
import { windowSize } from '../../utils/constant';
import { Segmented, Tooltip } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

const DisplayModeSwitchButton = ({ onChange }: { onChange: (value: string) => void }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Segmented
      size={screenSize.x > windowSize.md ? 'middle' : 'small'}
      onChange={onChange}
      options={[
        {
          value: 'table',
          icon: (
            <Tooltip title={'リスト表示に変更'}>
              <UnorderedListOutlined />
            </Tooltip>
          )
        },
        {
          value: 'grid',
          icon: (
            <Tooltip title={'グリッド表示に変更'}>
              <AppstoreOutlined />
            </Tooltip>
          )
        }
      ]}
    ></Segmented>
  );
};

export default DisplayModeSwitchButton;

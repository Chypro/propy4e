import { FloatButton, Tooltip } from 'antd';
import React, { useState } from 'react';
import { BsThreeDots, BsChatDots } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { ImMagicWand } from 'react-icons/im';
import { ThemeModal } from '..';

const AppFloatButton = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [open, setOpen] = useState<boolean>(false);

  const [themeModalOpen, setThemeModalOpen] = useState<boolean>(false);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleThemeModalOpen = (value: boolean): void => {
    setThemeModalOpen(value);
    setOpen(false);
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <FloatButton.Group
        onClick={() => setOpen(!open)}
        open={open}
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<BsThreeDots />}
      >
        <Tooltip placement="left" title="チャット">
          <FloatButton type="primary" icon={<BsChatDots />} />
        </Tooltip>

        <Tooltip placement="left" title="テーマ変更">
          <FloatButton
            type="primary"
            onClick={() => handleThemeModalOpen(true)}
            icon={<ImMagicWand />}
          />
        </Tooltip>

        <Tooltip placement="left" title="設定">
          <FloatButton type="primary" icon={<IoSettingsOutline />} />
        </Tooltip>
      </FloatButton.Group>

      <ThemeModal open={themeModalOpen} handleClose={() => handleThemeModalOpen(false)} />
    </React.Fragment>
  );
};

export default AppFloatButton;

import { Button, ConfigProvider, Popover } from 'antd';
import { useAppSelector } from '../../store/store';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AppHamburgerMenuPopver } from '..';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { windowSize } from '../../utils/constant';

const AppHamburgerButton = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    if (screenSize.x > windowSize.lg) {
      setIsMenuOpen(false);
    }
  }, [screenSize]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorLink: themeColor['gray'][700],
            colorLinkHover: themeColor[primaryColor][300],
            fontSize: 16
          }
        }
      }}
    >
      <Popover
        content={<AppHamburgerMenuPopver />}
        arrow={false}
        open={isMenuOpen}
        placement="bottomRight"
      >
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="link"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          icon={isMenuOpen ? <GrClose /> : <RxHamburgerMenu />}
        ></Button>
      </Popover>
    </ConfigProvider>
  );
};

export default AppHamburgerButton;

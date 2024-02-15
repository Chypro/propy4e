import { ConfigProvider, Drawer, Switch } from 'antd';
import { useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setIsDarkMode, setPrimaryColor } from '../../features/themeSlice';
import { ImMagicWand } from 'react-icons/im';

const ThemeModal = ({
  open = false,
  handleClose = () => {}
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();

  const isDarkMode = useAppSelector((state) => state.persist.themeReducer.isDarkMode);
  const themeColor = useAppSelector((state) => state.persist.themeReducer.themeColor);
  const primaryColor = useAppSelector((state) => state.persist.themeReducer.primaryColor);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleModeSwitch = (value: boolean): void => {
    dispatch(setIsDarkMode(value));
  };

  const handleColorSelect = (value: string): void => {
    if (value !== primaryColor) {
      dispatch(setPrimaryColor(value));
    }
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <Drawer title="Theme Setting" open={open} onClose={handleClose}>
      <div style={{ color: themeColor.gray[700] }}>
        {/* Switch Mode */}
        <div className="flex items-center">
          <span className="me-2">Mode</span>
          <ConfigProvider
            theme={{
              components: {
                Switch: {}
              }
            }}
          >
            <Switch
              checked={isDarkMode}
              onChange={handleModeSwitch}
              className="bg-zinc-300"
            ></Switch>
          </ConfigProvider>
        </div>

        <div className="grid grid-cols-6 gap-2 mt-5">
          {/* Switch Color */}
          {Object.entries(themeColor).map(([key, value]) => (
            <div
              key={key}
              onClick={() => handleColorSelect(key)}
              style={{ backgroundColor: value[400], color: value[100] }}
              className="w-[48px] h-[48px] rounded-full cursor-pointer shadow-md
              hover:scale-105 duration-100 ease-in-out flex justify-center items-center"
            >
              {primaryColor === key && <ImMagicWand size={22} />}
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default ThemeModal;

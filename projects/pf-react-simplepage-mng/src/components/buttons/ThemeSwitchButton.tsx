import React, { useState } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setIsDarkMode } from '../../features/themeSlice';

const ThemeSwitchButton = ({ size }: { size: number }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.persist.themeReducer.isDarkMode);
  const themeColor = useAppSelector((state) => state.persist.themeReducer.themeColor);
  const primaryColor = useAppSelector((state) => state.persist.themeReducer.primaryColor);

  const [isHover, setIsHover] = useState(false);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleThemeSwitch = (value: boolean): void => {
    dispatch(setIsDarkMode(value));
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <React.Fragment>
      {/* <AnimateBg position={animateBgPosition} size={size} /> */}
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => handleThemeSwitch(!isDarkMode)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          marginRight: '5px'
        }}
        className=" bg-inherit rounded-full flex justify-center items-center 
     cursor-pointer relative"
      >
        {/* moon icon */}
        <div
          style={{
            color: isHover ? themeColor[primaryColor][300] : themeColor['gray'][700]
          }}
          className={
            (!isDarkMode ? ' rotate-[360deg] scale-0 delay-100' : '') +
            ' ease-in-out duration-300 absolute w-full h-full flex items-center justify-center'
          }
        >
          <IoMoon size={size} />
        </div>

        {/* sun icon */}
        <div
          style={{
            color: isHover ? themeColor[primaryColor][300] : themeColor['gray'][700]
          }}
          className={
            (isDarkMode ? ' rotate-[360deg] scale-0 delay-100 ' : ' ') +
            ' ease-in-out duration-300 absolute w-full h-full flex items-center justify-center'
          }
        >
          <IoSunny size={size} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ThemeSwitchButton;

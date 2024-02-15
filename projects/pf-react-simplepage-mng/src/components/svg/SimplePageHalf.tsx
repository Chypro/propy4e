import React from 'react';
import { useAppSelector } from '../../store/store';

const SimplePageHalf = () => {
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);

  return (
    <>
      <svg
        width="30"
        height="30"
        viewBox="0 0 122 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M76.07 0H2.31C1.03422 0 0 1.03422 0 2.31V76.07C0 77.3458 1.03422 78.38 2.31 78.38H76.07C77.3458 78.38 78.38 77.3458 78.38 76.07V2.31C78.38 1.03422 77.3458 0 76.07 0Z"
          fill={themeColor[primaryColor][200]}
        />
        <path
          d="M119.26 0H87.9399C86.8022 0 85.8799 0.922293 85.8799 2.06V33.38C85.8799 34.5177 86.8022 35.44 87.9399 35.44H119.26C120.398 35.44 121.32 34.5177 121.32 33.38V2.06C121.32 0.922293 120.398 0 119.26 0Z"
          fill={themeColor[primaryColor][500]}
        />
        <path
          d="M119.44 42.8008H87.7599C86.7216 42.8008 85.8799 43.6425 85.8799 44.6808V76.3608C85.8799 77.3991 86.7216 78.2408 87.7599 78.2408H119.44C120.478 78.2408 121.32 77.3991 121.32 76.3608V44.6808C121.32 43.6425 120.478 42.8008 119.44 42.8008Z"
          fill={themeColor[primaryColor][700]}
        />
      </svg>
    </>
  );
};

export default SimplePageHalf;

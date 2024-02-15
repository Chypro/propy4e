import React from 'react';
import { useAppSelector } from '../../store/store';

const NotFound = () => {
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
    <div
      className="w-full h-full flex justify-center items-center text-3xl"
      style={{
        color: themeColor[primaryColor][300]
      }}
    >
      404 Not Found
    </div>
  );
};

export default NotFound;

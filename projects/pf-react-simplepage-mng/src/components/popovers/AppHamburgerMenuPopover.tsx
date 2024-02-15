import React from 'react';
import { useAppSelector } from '../../store/store';
import { Divider } from 'antd';
import { HeaderSearchInput } from '..';
import UserMenu from '../menus/UserMenu';

const AppHamburgerMenuPopover = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { user } = useAppSelector((state) => state.persist.authReducer);
  console.log(user);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div className="w-[90vw] ">
      <div className="px-4 pb-2">
        <div className="text-[16px] font-semibold">
          {user.firstName} {user.lastName}
        </div>
        <div>{user.userID}</div>
      </div>

      <Divider
        style={{
          margin: 0
        }}
      />

      <div className="w-full my-2">
        <HeaderSearchInput />
      </div>
      <UserMenu />
    </div>
  );
};

export default AppHamburgerMenuPopover;

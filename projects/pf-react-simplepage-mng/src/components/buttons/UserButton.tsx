import { Avatar, Button, ConfigProvider, Popover, Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useGetUserQuery } from '../../services/authApi';
import { UserMenuPopover } from '..';
import { User } from '../../types/app/auth';
import { setUser } from '../../features/authSlice';
import { GetUserResopnse } from '../../types/api/auth';
import { stringToColor } from '../../utils/utils';

const UserButton = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useAppDispatch();

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const { user } = useAppSelector((state) => state.persist.authReducer);

  const [avatarColor, setAvatarColor] = useState<string>(themeColor.blue[500]);
  const getUserQuery = useGetUserQuery();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const updateUser = (data: GetUserResopnse): void => {
    const user: User = {
      uuid: data.data.uuid,
      userID: data.data.user_id,
      firstName: data.data.firstname,
      lastName: data.data.lastname,
      isSuper: data.data.is_super ? true : false
    };
    dispatch(setUser(user));
    updateAvataColor(user.firstName + user.lastName);
  };

  const updateAvataColor = (name: string): void => {
    const nameColor = stringToColor(name);
    setAvatarColor(nameColor);
  };

  useEffect(() => {
    if (getUserQuery.isSuccess) {
      // console.log('getUserQuery.data :>> ', getUserQuery.data);
      if (getUserQuery.data.result === 'success') {
        updateUser(getUserQuery.data);
      }
    } else {
      // console.log('getUserQuery.error :>> ', getUserQuery);
    }
  }, [getUserQuery]);

  useEffect(() => {
    getUserQuery.refetch();
  }, []);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div className="h-full flex justify-center items-center">
      <ConfigProvider
        theme={{
          components: {
            Button: {
              controlHeight: 30,
              colorPrimary: 'transparent',
              colorPrimaryHover: themeColor[primaryColor][200],
              primaryColor: themeColor.gray[700],
              primaryShadow: ''
            },
            Skeleton: {
              controlHeight: 30
            }
          }
        }}
      >
        {getUserQuery.isLoading ? (
          <Skeleton.Button style={{ display: 'flex', width: '100px' }} active={true} />
        ) : (
          <Popover
            content={<UserMenuPopover />}
            placement="bottomRight"
            arrow={false}
            trigger={'click'}
          >
            <Button
              type="primary"
              // shape="circle"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                maxWidth: '120px'
              }}
            >
              <Avatar
                style={{
                  backgroundColor: avatarColor,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                size={24}
                icon={<AiOutlineUser size={18} />}
              />
              <div className="ps-2 max-w-[100px] truncate hidden md:block">
                {user.firstName} {user.lastName}
              </div>
            </Button>
          </Popover>
        )}
      </ConfigProvider>
    </div>
  );
};

export default UserButton;

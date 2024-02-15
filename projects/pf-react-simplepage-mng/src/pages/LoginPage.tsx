import { LoginForm, PublicRoute } from '../components';
import { useAppSelector } from '../store/store';

const LoginPage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { themeColor } = useAppSelector((state) => state.persist.themeReducer);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <PublicRoute>
      <div
        style={{
          backgroundColor: themeColor.gray[100],
          color: themeColor.gray[700]
        }}
        className="w-screen h-screen "
      >
        {/* title */}
        <div className="md:p-12 pt-5 text-3xl font-semibold w-full text-center md:text-left hidden md:block">
          SimplePage管理ツール
        </div>

        {/* login form */}
        <div className=" flex justify-center items-center absolute top-0 left-0 w-screen h-screen z-10">
          <LoginForm />
        </div>

        {/* footer */}
        <div className=" flex flex-col justify-end items-center absolute top-0 left-0 w-screen h-screen">
          <div
            style={{
              color: themeColor.gray[500]
            }}
            className=" prevent-select text-center text-xs pb-5"
          >
            SimplePage管理ツール Copyright(C)2006-2024 ProField Co.,Ltd.
            <br className="block md:hidden" />
            All rights reserved.
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default LoginPage;

import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';

import { useAppSelector } from '../../store/store';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { LoginRequest, LoginResponse, LoginResponseError } from '../../types/api/auth';
import { useUserLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setAuth, setEmail, setJWT } from '../../features/authSlice';
import { appRoute } from '../../utils/routes';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { JWT } from '../../types/app/auth';
import { useGetWorkspaceListMutation } from '../../services/workspaceApi';
import { GetWorkspaceListResponse } from '../../types/api/workspace';
import { setWorkspaceListResponse } from '../../features/workspaceSlice';
import { setForceRedirectLocation, setSelectedWorkspaceDomain } from '../../features/appSlice';
import { useState } from 'react';
import { useGetSiteListQuery } from '../../services/sitesApi';

const LoginForm = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  type LoginFormType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const [userLogin, { isLoading: userLoginLoading }] = useUserLoginMutation();
  const [getWorkspaceList, { isLoading: getWorkspaceListLoading }] = useGetWorkspaceListMutation();
  const { data: siteData } = useGetSiteListQuery();

  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleLogin = (value: LoginFormType) => {
    setLoginErrorMessage('');
    const request: LoginRequest = {
      user_id: value.email as string,
      password: value.password as string
    };
    console.log('lastPath :>> ', location.state?.from);

    // call login api
    userLogin(request).then((res: any) => {
      console.log('res :>> ', res);
      if (res.error) {
        const response = res as LoginResponseError;
        console.log('error :>> ', response.error.error);
      } else {
        const response = res as LoginResponse;
        if (response.data.status === 'FAILED') {
          console.log('failed :>> ', response.data.detail);
          setLoginErrorMessage('メールアドレスまだはパスワードが違います。');
        } else {
          // set token data to state
          const jwt: JWT = {
            refreshToken: response.data.refresh_token ?? '',
            token: response.data.token ?? ''
          };
          dispatch(setJWT(jwt));
          dispatch(setEmail(value.email ?? ''));
          console.log('call get workspace list api');
          // call get workspace list api
          getWorkspaceList().then((getWorkspaceResult: any) => {
            console.log('getWorkspaceResult :>> ', getWorkspaceResult);
            if (getWorkspaceResult.error) {
              console.log('get workspace list error :>> ', getWorkspaceResult);
            } else {
              const getWorkspaceListResponse = getWorkspaceResult.data as GetWorkspaceListResponse;

              console.log(getWorkspaceListResponse.result);
              if (getWorkspaceListResponse.result === 'success') {
                console.log('getWorkspaceListResponse :>> ', getWorkspaceListResponse);
                dispatch(setWorkspaceListResponse(getWorkspaceListResponse));
                if (getWorkspaceListResponse.data.length > 1) {
                  dispatch(setForceRedirectLocation(appRoute.workspace));
                } else {
                  dispatch(setSelectedWorkspaceDomain(getWorkspaceListResponse.data[0].domain));
                  if (siteData.data.length === 0) {
                    dispatch(setForceRedirectLocation(appRoute.media));
                  } else {
                    console.log(siteData.data[0].cd);
                    dispatch(setForceRedirectLocation(appRoute.media));
                  }
                }

                dispatch(setAuth(true));
              }
            }
          });
        }
      }
    });
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <>
      <div
        style={{
          boxShadow: '0px 0px 5px 0px ' + themeColor[primaryColor][300]
        }}
        className="md:max-w-lg md:w-full w-[calc(100vw-5px)] mx-auto rounded-md"
      >
        <div className="flex flex-col w-full items-center prevent-select">
          <div className="text-xl font-semibold mt-8">SimplePage管理ツール</div>
          <div className="text-3xl font-light mt-5">ログイン</div>
          <div style={{ color: themeColor.gray[400] }} className="text-sm my-2">
            アカウント情報を入力してください
          </div>
          <div></div>
        </div>

        <div className="px-5">
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  itemMarginBottom: 20
                }
              }
            }}
          >
            <Form
              onFinish={handleLogin}
              name="loginForm"
              autoComplete="off"
              style={{ width: '100%' }}
              layout="vertical"
            >
              {/* email */}
              <Form.Item<LoginFormType>
                label="メールアドレス"
                name="email"
                rules={[
                  { required: true, message: 'メールアドレスを入力してください' },
                  { type: 'email', message: 'メールアドレスを入力してください' }
                ]}
              >
                <Input />
              </Form.Item>

              {/* password */}
              <Form.Item<LoginFormType>
                label="パスワード"
                name="password"
                rules={[{ required: true, message: 'パスワードを入力してください' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        lineHeight: 0,
                        fontSize: 12
                      }
                    }
                  }}
                >
                  <Link to={appRoute.reset}>
                    <Button type="link">パスワードを忘れた方</Button>
                  </Link>
                </ConfigProvider>
              </Form.Item>

              {/* remember me */}
              <Form.Item<LoginFormType>
                name="remember"
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
                valuePropName="checked"
              >
                <Checkbox>ログインのままにする</Checkbox>
              </Form.Item>

              {loginErrorMessage && (
                <div className="w-full text-center text-red-500">{loginErrorMessage}</div>
              )}

              {/* submit button */}
              <Form.Item>
                <HappyProvider>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={userLoginLoading || getWorkspaceListLoading}
                  >
                    ログイン
                  </Button>
                </HappyProvider>
              </Form.Item>

              {/* read me */}
              <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        lineHeight: 0,
                        fontSize: 12
                      }
                    }
                  }}
                >
                  <Button type="link" htmlType="submit">
                    必ずお読みください
                  </Button>
                </ConfigProvider>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

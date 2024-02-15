import { PublicRoute } from '../components';
import { useAppSelector } from '../store/store';
import { Button, Form, Input } from 'antd';

const PasswordResetPage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { themeColor } = useAppSelector((state) => state.persist.themeReducer);
  type resetFormType = {
    email?: string;
  };
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
        className="w-screen h-screen"
      >
        <div className="flex flex-col gap-4 mx-auto w-auto max-w-2xl">
          {/* title */}
          <div
            style={{ color: themeColor.gray[500] }}
            className="pt-10 text-lg md:text-3xl font-extrabold w-full text-center"
          >
            SimplePage管理ツール
          </div>
          <div
            style={{ color: themeColor.gray[800] }}
            className="pt-5 text-xl md:text-4xl font-extrabold w-full text-center"
          >
            パスワード再設定
          </div>
          <div className="pt-5 text-sm md:text-xl px-1">
            パスワードをお忘れですか？パスワードをリセットするために、メールアドレスを入力してください。
          </div>
          <Form
            //onFinish={handleLogin}
            name="resetForm"
            autoComplete="off"
            style={{ width: '100%', padding: 5 }}
            layout="vertical"
          >
            {/* email */}
            <Form.Item<resetFormType>
              label="メールアドレス："
              name="email"
              rules={[
                { required: true, message: 'メールアドレスを入力してください' },
                { type: 'email', message: 'メールアドレスを入力してください' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block>
                パスワードをリセット
              </Button>
            </Form.Item>
          </Form>
          <div className="pt-5 text-sm md:text-xl px-1 text-center">
            パスワードの再設定に問題がある場合はご連絡ください
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default PasswordResetPage;

import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Space,
  Tree,
  TreeDataNode
} from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { ProtectedRoute } from '../components';
import { useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { appRoute } from '../utils/routes';
import TextArea from 'antd/es/input/TextArea';

const CreateSitePage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { themeColor, primaryColor, isDarkMode } = useAppSelector(
    (state) => state.persist.themeReducer
  );

  const treeData: TreeDataNode[] = [
    {
      key: '0-0',
      title: (
        <div
          className={
            (isDarkMode ? 'ring-zinc-700' : 'ring-zinc-300') +
            ' w-[500px] h-[50px]  rounded-md ring-[1px]   flex items-center p-2 -mx-1'
          }
        >
          食べ物
        </div>
      ),
      children: [
        {
          key: '0-0-0',
          title: (
            <div
              className={
                (isDarkMode ? 'ring-zinc-700' : 'ring-zinc-300') +
                ' w-[500px] h-[50px]  rounded-md ring-[1px]  flex items-center p-2 -mx-1'
              }
            >
              果物
            </div>
          )
        }
      ]
    },
    {
      key: '0-1',
      title: (
        <div
          className={
            (isDarkMode ? 'ring-zinc-700' : 'ring-zinc-300') +
            ' w-[500px] h-[50px]  rounded-md ring-[1px]  flex items-center p-2 -mx-1'
          }
        >
          家電
        </div>
      ),
      children: [
        {
          key: '0-1-0',
          title: (
            <div
              className={
                (isDarkMode ? 'ring-zinc-700' : 'ring-zinc-300') +
                ' w-[500px] h-[50px]  rounded-md ring-[1px]  flex items-center p-2 -mx-1'
              }
            >
              キッチン家電
            </div>
          )
        }
      ]
    }
  ];

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ProtectedRoute>
      <div
        style={{ backgroundColor: themeColor.gray[50], color: themeColor.gray[700] }}
        className="w-full h-full p-4"
      >
        <Breadcrumb
          items={[
            {
              title: (
                <Link to={appRoute.home}>
                  <HomeOutlined />
                </Link>
              )
            },

            {
              title: '新しいサイト'
            }
          ]}
        />

        <div className="mt-2">
          {/* header */}
          <div className="w-full flex justify-between items-center">
            <div
              style={{ color: themeColor.gray[800] }}
              className=" md:text-2xl text-base font-semibold text-left pe-2 md:mb-0 truncate max-w-[120px] md:max-w-[500px]"
            >
              サイト作成
            </div>
            <div>
              <Button type="primary">
                <PlusOutlined />
                作成
              </Button>
            </div>
          </div>

          {/* form */}
          <div className="mt-2">
            <Form>
              <Form.Item required label={<div className="w-[100px] text-left">サイト名</div>}>
                <Input style={{ maxWidth: '500px' }} />
              </Form.Item>
              <Form.Item label={<div className="w-[110px] text-left">サイト説明</div>}>
                <TextArea style={{ maxWidth: '500px' }} rows={4} />
              </Form.Item>
            </Form>
          </div>

          {/* site category */}
          <div className="w-full flex items-start">
            {/* label */}
            <div className="w-[120px] flex justify-between items-center">
              <div>サイトカテゴリ</div>
              <div>:</div>
            </div>

            {/* tree */}
            <div className="w-[calc(100%-120px)] h-[300px] ps-2 pt-1">
              <ConfigProvider
                theme={{
                  components: {
                    Tree: {
                      colorBgContainer: 'transparent',
                      paddingXS: 10,
                      titleHeight: 50,
                      colorBorder: themeColor[primaryColor][300],
                      colorTextSecondary: 'red'
                    }
                  }
                }}
              >
                <div className="mb-2">
                  <Button
                    style={{
                      width: 500,
                      height: 50,
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center'
                    }}
                    type="dashed"
                  >
                    <PlusOutlined />
                    カテゴリーの追加
                  </Button>
                </div>
                <Tree draggable treeData={treeData}></Tree>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateSitePage;

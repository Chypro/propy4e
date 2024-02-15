import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paramKey } from '../utils/constant';
import { useGetSkuDetailMutation } from '../services/blockApi';
import { Tabs, message, Image, Button, TabsProps, ConfigProvider } from 'antd';
import { GetSkuDetailResponse } from '../types/api/sku';
import { fallback } from '../data/imgFallback';
import { Sku } from '../types/app/sku';
import { useGetLablesLIstQuery, useUpdateLablesOfSkuMutation } from '../services/lablesApi';
import { UpdateLabelsOfSkuResponse, UpdateLablesOfSkuRequest } from '../types/api/lable';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  ProtectedRoute,
  SkuDetailAssetTab,
  SkuDetailAttributeTab,
  SkuLabelInput
} from '../components';
import { IoArrowBack } from 'react-icons/io5';
import { appRoute } from '../utils/routes';
import { setSkuDetail } from '../features/skuDetailSlice';

// ------------------------------------------------------------------------------
// variables
// ------------------------------------------------------------------------------
type Option = {
  value: string | null;
  label: string | null;
}[];
const SkuDetailPage = () => {
  enum SkuDetailEnum {
    attributes = '1',
    asset = '2'
  }
  const items: TabsProps['items'] = [
    {
      key: SkuDetailEnum.attributes,
      label: '項目',
      children: <SkuDetailAttributeTab />
    },
    {
      key: SkuDetailEnum.asset,
      label: 'アセット',
      children: <SkuDetailAssetTab />
    }
  ];

  const dispatch = useAppDispatch();

  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const { selectedBlockDetailID } = useAppSelector((state) => state.persist.appReducer);
  const { skuDetail } = useAppSelector((state) => state.skuDetailReducer);

  const [selectedTab, setselectedTab] = useState<SkuDetailEnum>(SkuDetailEnum.attributes);
  const [searchParams, setSearchParams] = useSearchParams();
  const [getSkuDetialMutation, { isSuccess, isLoading }] = useGetSkuDetailMutation();
  // const [skuDetail, setskuDetail] = useState<Sku>();
  const { data: allLabels } = useGetLablesLIstQuery();
  const [updateLabel, { isLoading: isUpdateLabelLoading }] = useUpdateLablesOfSkuMutation();
  // const [displayLabelOptions, setdisplayLabelOptions] = useState<Option>();
  const [selectedLabels, setselectedLabels] = useState<Option>();
  const navigate = useNavigate();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleTabClick = (key: string) => {
    setSearchParams({
      [paramKey.skuDetail.id]: skuDetail?.id,
      [paramKey.skuDetail.tab]: key
    });
    setselectedTab(key as SkuDetailEnum);
  };
  const getSkuDetail = (id: string) => {
    getSkuDetialMutation(id).then((res: any) => {
      if (res.error) {
        console.log('詳細の取得に失敗しました。', res);
        message.error('詳細の取得に失敗しました。');
      } else {
        const response = res.data as GetSkuDetailResponse;
        if (response.result === 'success') {
          console.log(response.data);
          let sku: Sku = {
            cd: response.data.cd,
            id: response.data.id,
            name: response.data.name,
            pclName: response.data.product_classification.name,
            img: response.data.img,
            label: response.data.labels,
            attributes: []
          };

          response.data.attributes.map((attr) => {
            sku.attributes.push({
              cd: attr.attribute,
              id: attr.id,
              name: attr.name,
              type: attr.control_type,
              require: attr.not_null === '1' ? true : false,
              defaultValue: attr.default_value,
              value: attr.value,
              isWithUnit: attr.is_with_unit === '1' ? true : false,
              units: attr.unit ? attr.unit.split(';') : [],
              order: attr.order,
              options: attr.select_list ? attr.select_list.split(';') : [],
              maxLength: attr.max_length,
              isCommon: attr.is_common === '1' ? true : false,
              isDeleted: attr.is_deleted === '1' ? true : false,
              isFixed: attr.is_fixed === '1' ? true : false,
              isPrivate: attr.is_private === '1' ? true : false
            });
          });

          dispatch(setSkuDetail(sku));
        }
      }
    });
  };

  useEffect(() => {
    const selectedLabelData = skuDetail?.label?.split(';').slice(1);
    if (!selectedLabelData) return;
    // setdisplayLabelOptions(
    //   Object.values(allLabels?.data).map((item, i) => {
    //     return { value: item.color, label: item.name };
    //   })
    // );
    setselectedLabels(
      selectedLabelData.map((item, i) => {
        return {
          value: allLabels?.data[item].color,
          label: allLabels?.data[item].name
        };
      })
    );
  }, [skuDetail]);

  useEffect(() => {
    if (searchParams.get(paramKey.skuDetail.id)) {
      const id = searchParams.get(paramKey.skuDetail.id);
      if (id !== '') {
        getSkuDetail(id);
      }
    }

    if (searchParams.get(paramKey.skuDetail.tab)) {
      const tab = searchParams.get(paramKey.skuDetail.tab);
      setselectedTab((tab as SkuDetailEnum) ?? SkuDetailEnum.attributes);
    }
  }, [searchParams]);

  // const handleLabelSelect = (isOpen: boolean) => {
  //   if (isOpen) return;
  //   let labelString: string = '';
  //   selectedLabels?.map((item, i) => {
  //     labelString += `;${item.label}`;
  //   });
  //   const request: UpdateLablesOfSkuRequest = {
  //     body: {
  //       labels: labelString
  //     },
  //     id: skuDetail?.id
  //   };

  //   updateLabel(request).then((res: any) => {
  //     if (res.error) return;
  //     const response = res.data as UpdateLabelsOfSkuResponse;
  //     if (response.result !== 'success') return;
  //     message.success(`ラベルは正常に更新されました`);
  //   });
  // };

  // const handleSelectChange = (e: string[], selectedLabels: any[]) => {
  //   setselectedLabels(
  //     selectedLabels.map((label) => {
  //       return { value: label.value, label: label.label };
  //     })
  //   );
  // };

  // const handleBackButton = () => {
  //   navigate(-1);
  // };

  const handlePrevPageClick = () => {
    navigate({
      pathname: appRoute.blockDetail,
      search: `?${paramKey.blockDetail.id}=${selectedBlockDetailID}`
    });
  };

  const handleTagClose = (label: string, value: string) => {
    let labelString: string = '';

    setselectedLabels(
      selectedLabels?.filter((item) => {
        if (item.label !== label && item.value !== value) {
          labelString += `;${item.label}`;
          return item;
        }
      })
    );

    const request: UpdateLablesOfSkuRequest = {
      body: {
        labels: labelString
      },
      id: skuDetail?.id
    };

    updateLabel(request).then((res: any) => {
      if (res.error) return;
      const response = res.data as UpdateLabelsOfSkuResponse;
      if (response.result !== 'success') return;
      message.success(`ラベルは正常に更新されました`);
    });
  };

  const handleLabelSelectV2 = (label: string, value: string, isDelete: boolean) => {
    let updatedSelectedLabels = [...selectedLabels];

    if (!isDelete) {
      updatedSelectedLabels.push({
        value: value,
        label: label
      });
    } else {
      updatedSelectedLabels = updatedSelectedLabels.filter((item) => {
        if (item.label !== label && item.value !== value) {
          return item;
        }
      });
    }

    let labelString: string = '';

    updatedSelectedLabels.map((item) => {
      labelString += `;${item.label}`;
    });

    const request: UpdateLablesOfSkuRequest = {
      body: {
        labels: labelString
      },
      id: skuDetail?.id
    };

    updateLabel(request).then((res: any) => {
      if (res.error) return;
      const response = res.data as UpdateLabelsOfSkuResponse;
      if (response.result !== 'success') return;
      message.success(`ラベルは正常に更新されました`);
    });
    setselectedLabels(updatedSelectedLabels);
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <ProtectedRoute>
      <div
        style={{ backgroundColor: themeColor.gray[50], color: themeColor.gray[700] }}
        className="w-full h-full p-4"
      >
        {/* header */}
        <div className="w-full flex items-center justify-between">
          {/* left */}
          <div className="flex items-center">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorLink: themeColor['gray'][700],
                    colorLinkHover: themeColor[primaryColor][300],
                    fontSize: 24
                  }
                }
              }}
            >
              <Button
                type="link"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={handlePrevPageClick}
                icon={<IoArrowBack />}
              ></Button>
            </ConfigProvider>
            <div
              style={{ color: themeColor.gray[800] }}
              className=" flex-none md:text-2xl text-base font-semibold text-left pe-2  md:mb-0 truncate max-w-[120px] md:max-w-[500px]"
            >
              SKU詳細
            </div>
          </div>

          {/* right */}
          <div>
            <Button
              // loading={isBlockUpdateLoading}
              // onClick={() => updateBlockValue()}
              type="primary"
            >
              保存
            </Button>
          </div>
        </div>

        <div className="w-full flex mt-5">
          <div className="w-[300px] space-y-5">
            <div className="w-full flex  ">
              <Image src={skuDetail?.img} width={250} height={250} fallback={fallback}></Image>
            </div>
            <div>商品コード：{skuDetail?.cd}</div>
            <div>商品名：{skuDetail?.name}</div>
            <div>商品分類名：{skuDetail?.pclName}</div>
            <SkuLabelInput
              selectedLabels={selectedLabels}
              handleTagClose={handleTagClose}
              handleLabelSelect={handleLabelSelectV2}
            />
          </div>
          <div className="w-[calc(100%-300px)] ">
            <Tabs activeKey={selectedTab} items={items} onChange={handleTabClick}></Tabs>
          </div>
        </div>
      </div>

      {/* <div className="ml-5">
        <Space className=" flex ">
          <Button onClick={() => handleBackButton()} type="text">
            ←
          </Button>
          <h2>SKU詳細画面</h2>
        </Space>
        <div className="flex">
          <div className="w-1/4">
            <Image src={skuDetail?.img} width={180} height={180} fallback={fallback}></Image>
            <div>商品コード：{skuDetail?.cd}</div>
            <div>商品名：{skuDetail?.name}</div>
            <div>商品分類名：{skuDetail?.pclName}</div>
            <div className="flex flex-col">
              <Space>
                <div>リスト</div>
              </Space>
              <Space className="flex flex-wrap">
                <Select
                  className=" min-w-[200px]"
                  onDropdownVisibleChange={handleLabelSelect}
                  onChange={handleSelectChange}
                  mode="multiple"
                  tagRender={tagRender}
                  options={displayLabelOptions}
                  value={selectedLabels?.map((item, i) => {
                    return item.value;
                  })}
                ></Select>
              </Space>
            </div>
          </div>
          <div>
            <Tabs activeKey={selectedTab} items={items} onChange={handleTabClick}></Tabs>
          </div>
        </div>
      </div> */}
    </ProtectedRoute>
  );
};

export default SkuDetailPage;
// type TagRender = SelectProps['tagRender'];
// const tagRender: TagRender = (props) => {
//   const { label, value, closable, onClose } = props;
//   // console.log(label, value);
//   const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };
//   return (
//     <Tag
//       color={value}
//       onMouseDown={onPreventMouseDown}
//       onClose={onClose}
//       style={{ marginRight: 3 }}
//     >
//       {label}
//     </Tag>
//   );
// };

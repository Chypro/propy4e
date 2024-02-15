import React, { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { CategoryTree, SettingHeader } from '..';
import { useGetAccessibleChanelListQuery } from '../../services/channelsApi';
import { AccessibleChannelsType } from '../../types/app/channel';
import { createSiteCategoryBodyType } from '../../services/sitesApi';
import { RegisterCategoriesBody } from '../../types/api/category';
import { useGetCategoriesMutation } from '../../services/categoriesApi';
import { TreeNodeType } from '../../types/app/categories';
import { ModalContainer, ConfirmModal, AddDataModal } from '..';
import { NewSiteCategoryModal } from './SiteSettingTab';

type ChannelTabsType = {
    key: string,
    label: string,
    dataTree: TreeNodeType[], 
};

const CategorySettingTab = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [channelTabs, setChannelTabs] = useState<ChannelTabsType[]>([]);

  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [tabItems, setTabItems] = useState<TabsProps['items']>([]);

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>('');

  const [isAddDataModalVisible, setIsAddDataModalVisible] = useState<boolean>(false);
  const addDataText = 'カテゴリ';

  const [isSelfModalVisible, setIsSelfModalVisible] = useState(false);
  const [isFileModalVisible, setIsFileModalVisible] = useState(false);

  const getAccessibleChanelList = useGetAccessibleChanelListQuery();
  const [accesibleChannels, setaccesibleChannels] = useState<AccessibleChannelsType[]>();
  const [
    getCategory,
    { isLoading: isCategoryLoading, isError: isCategoryError, isSuccess: isCategorySuccess }
  ] = useGetCategoriesMutation();
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    if (getAccessibleChanelList.isSuccess) {
      setaccesibleChannels(getAccessibleChanelList.data.data);
    }
  }, [getAccessibleChanelList.data]);

  useEffect(() => {
    if (accesibleChannels){
      const getAllItems = async () => {
        const items = await Promise.all(accesibleChannels.map(async (channel: AccessibleChannelsType, i: number) => {
          const data = getCategory(channel.cd).then((res: any) => {
            console.log('res :>> ', res);
            if (res.error) {
              console.error('カテゴリを取得できませんでした');
              return {
                key: channel.cd.toString(),
                label: channel.name,
                dataTree: [],
              };
            } else if(res.data.result === 'success') {
              console.log('カテゴリを取得しました:>>', res.data.data);
              return {
                key: channel.cd.toString(),
                label: channel.name,
                dataTree: res.data.data.children,
              };
            }
          });
          return data;
        }))
        setChannelTabs(items);
      }
      getAllItems();
    }
  }, [accesibleChannels]);

  useEffect(() => {
    if (channelTabs) {
      const items = channelTabs.map((item: ChannelTabsType) => {
        return {
          key: item.key,
          label: item.label,
          children: <CategoryTree searchTerm={searchTerm} dataTree={item.dataTree} setSelectedCategoryName={setSelectedCategoryName}/> 
        }; 
      })
      setTabItems(items);
    }
  }, [channelTabs, searchTerm]);


  // const handleEditButtonClick = (val: boolean, data: TableProps) => {
  //   //編集ボタンをクリック
  //   setIsEditSiteModalVisible(val);
  //   const editData = siteList.find((item: getSiteListResponseData) => item.cd === data['コード']);
  //   setEditSiteData(editData);
  // }

  const handleAddCatgory = (data: createSiteCategoryBodyType) => {
    //カテゴリの追加画面で保存ボタンをクリック
    console.log('カテゴリの追加:', data);
    // createSite({body: data}).then((res: any) => {
    //   console.log('res :>> ', res);
    //   if (res.error) {
    //     console.error('データを追加できませんでした');
    //   } else if(res.data.result === 'success'){
    //     getSiteListQuery.refetch()
    //     console.log('データを追加しました:>>');
    //   }
    // });
    setIsSelfModalVisible(false);
  }

  const handleClickDelete = () => {
    //削除確認を表示
    const text = "test";
    setConfirmText(text.toString());
    setIsConfirmModalVisible(true);
  }

  const handleDeleteSite = (isDelete: boolean) => {
    //選択したサイトの削除
    if (isDelete) {
      console.log("selected Category:>>");
    } else {
      console.log("cancel delete");
    }
  }

  // const handleEditSiteSubmit = (data: getSiteListResponseData, code: string) => {
  //   // 編集したサイトの更新処理を行う（データの保存など）
  //   console.log('サイト情報の更新:', data);
  //   updateSite({body: data, siteCd: code}).then((res: any) => {
  //     console.log('res :>> ', res);
  //     if (res.error) {
  //       console.error('データを保存できませんでした');
  //     } else if(res.data.result === 'success'){
  //       getSiteListQuery.refetch()
  //       console.log('データを保存しました:>>');
  //     }
  //   });
  //   // モーダルを閉じる
  //   setIsEditSiteModalVisible(false);
  //   setEditSiteData(null);
  // };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div style={{ overflow: 'auto' }}>
      <SettingHeader 
        settingHeaderText='カテゴリ'
        isDeleteDisabled={true}
        setIsModalVisible={setIsAddDataModalVisible} 
        onDelete={handleClickDelete} 
        setSearchTerm={setSearchTerm}
      />
      <div>
        <Tabs type="card" defaultActiveKey='0' items={tabItems}/>
      </div>
      <ModalContainer>
        <NewSiteCategoryModal
          visible={isSelfModalVisible}
          onAddSiteCategory={handleAddCatgory}
          onClose={setIsSelfModalVisible}
          categoryName={"テスト"}
        />
        <AddDataModal
          visible={isAddDataModalVisible}
          onClose={setIsAddDataModalVisible}
          text={addDataText}
          setIsSelfModalVisible={setIsSelfModalVisible}
          setIsFileModalVisible={setIsFileModalVisible}
        />
        <ConfirmModal
          visible={isConfirmModalVisible}
          text={confirmText}
          onClose={setIsConfirmModalVisible}
          handleDelete={handleDeleteSite}
        />
      </ModalContainer>
    </div>
  );
};

export default CategorySettingTab;

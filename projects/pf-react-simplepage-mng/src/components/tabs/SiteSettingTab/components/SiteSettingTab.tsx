import React, { useEffect, useState } from 'react';
import { useGetSiteListQuery, useGetSiteCategoriesQuery, useUpdateSiteMutation, useCreateSiteMutation, useDeleteSiteMutation, createSiteBodyType } from '../../../../services/sitesApi';
import { SiteSettingTable, SiteDetailPage, SiteSettingHeader, EditSiteModal, NewSiteModal } from '..';
import { ModalContainer, ConfirmModal } from '../../..';
import { TableProps, Spin, Modal } from 'antd';
import { getSiteListResponse, getSiteListResponseData } from '../../../../types/api/site';
import { TreeNodeType, FilteredSiteListType } from '../../../../types/app/categories';

const SiteSettingTab = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [isOpenSiteDetailPage, setIsOpenSiteDetailPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [clickSite, setClickSite] = useState<TableProps | null>(null);
  const [clickSiteCode, setClickSiteCode] = useState<string>('');
  const [siteCategories, setSiteCategories] = useState<TreeNodeType[]>([]);

  const [isNewSiteModalVisible, setIsNewSiteModalVisible] = useState<boolean>(false);

  const [isEditSiteModalVisible, setIsEditSiteModalVisible] = useState<boolean>(false);
  const [editSiteData, setEditSiteData] = useState<getSiteListResponseData | null>(null);
  
  const [selectedSites, setSelectedSites] = useState<TableProps[]>([]);

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>('');

  const getSiteListQuery = useGetSiteListQuery();
  const [siteList, setSiteList] = useState<getSiteListResponse['data']>([]);
  const [filteredSiteList, setFilteredSiteList] = useState<FilteredSiteListType[]>([]);
  const getSiteCategoriesQuery = useGetSiteCategoriesQuery(clickSiteCode);

  const [
    updateSite,
    { isLoading: isUpdateSiteLoading, isError: isUpdateSiteError, isSuccess: isUpdateSiteSuccess }
  ] = useUpdateSiteMutation();
  const [ 
    createSite,
    { isLoading: isCreateSiteLoading, isError: isCreateSiteError, isSuccess: isCreateSiteSuccess }
  ] = useCreateSiteMutation();
  const [ 
    deleteSite,
    { isLoading: isDeleteSiteLoading, isError: isDeleteSiteError, isSuccess: isDeleteSiteSuccess }
  ] = useDeleteSiteMutation();
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    console.log("object")
    if (getSiteListQuery.isSuccess) {
      setSiteList(getSiteListQuery.data.data);
      console.log("get sitelist success :>>", getSiteListQuery.data.data);
    }
  }, [getSiteListQuery.data]);

  useEffect(() => {
    if (siteList) {
      const newSiteList = siteList.map((item: getSiteListResponseData, i: number) => {
        return {
          名前: item.name,
          コード: item.cd
        };
      });
      setFilteredSiteList(newSiteList.filter(
        (item: FilteredSiteListType) => item['名前'].includes(searchTerm) || item['コード'].includes(searchTerm)
      ))
    }
  }, [siteList, searchTerm]);

  useEffect(() => {
    if (getSiteCategoriesQuery.isSuccess) {
      setSiteCategories(getSiteCategoriesQuery.data.data.children);
      console.log("category data:>>", getSiteCategoriesQuery.data.data);
    }
  }, [getSiteCategoriesQuery.data]);


  const handleClickRow = (data: TableProps) => {
    //サイト一覧テーブルの行をクリック
    setIsOpenSiteDetailPage(true);
    setClickSite(data);
    setClickSiteCode(data['コード']);
    setSelectedSites([]);
  }

  const setDetailPage = () => {
    //詳細ページから一覧へ戻るボタンをクリック
    setIsOpenSiteDetailPage(false);
  }

  const handleEditButtonClick = (val: boolean, data: TableProps) => {
    //編集ボタンをクリック
    setIsEditSiteModalVisible(val);
    const editData = siteList.find((item: getSiteListResponseData) => item.cd === data['コード']);
    setEditSiteData(editData);
  }

  const handleAddSite = (data: createSiteBodyType) => {
    //サイトの追加画面でokボタンをクリック
    console.log('サイト情報の追加:', data);
    createSite({body: data}).then((res: any) => {
      console.log('res :>> ', res);
      if (res.error) {
        console.error('データを追加できませんでした');
      } else if(res.data.result === 'success'){
        getSiteListQuery.refetch()
        console.log('データを追加しました:>>');
      }
    });
    setIsNewSiteModalVisible(false);
  }

  const handleClickDelete = () => {
    //削除確認を表示
    const text = selectedSites.map((site) => site['名前']);
    setConfirmText(text.toString());
    setIsConfirmModalVisible(true);
  }

  const handleDeleteSite = (isDelete: boolean) => {
    //選択したサイトの削除
    if (isDelete) {
      selectedSites.map((site) => {
        deleteSite(site['コード']).then((res: any) => {
          console.log('res :>> ', res);
          if (res.error) {
            console.error('データを削除できませんでした');
          } else if(res.data.result === 'success'){
            getSiteListQuery.refetch()
            console.log('データを削除しました:>>');
          }
        });
      })
      setSelectedSites([]);
      // モーダルを閉じる
      setIsConfirmModalVisible(false);
    } else {
      console.log("cancel delete");
    }
  }

  const handleEditSiteSubmit = (data: getSiteListResponseData, code: string) => {
    // 編集したサイトの更新処理を行う（データの保存など）
    console.log('サイト情報の更新:', data);
    updateSite({body: data, siteCd: code}).then((res: any) => {
      console.log('res :>> ', res);
      if (res.error) {
        console.error('データを保存できませんでした');
      } else if(res.data.result === 'success'){
        getSiteListQuery.refetch()
        console.log('データを保存しました:>>');
      }
    });
    // モーダルを閉じる
    setIsEditSiteModalVisible(false);
    setEditSiteData(null);
  };
  
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      {isOpenSiteDetailPage ? 
      (
        getSiteCategoriesQuery.isFetching ?
          <Spin/> :
          <SiteDetailPage siteProps={clickSite} setDetailPage={setDetailPage} dataTree={siteCategories}/>

      ):
      (
          <div>
            <SiteSettingHeader 
              isDeleteDisabled={selectedSites.length === 0}
              setIsNewSiteModalVisible={setIsNewSiteModalVisible} 
              onDeleteSites={handleClickDelete} 
              setSearchTerm={setSearchTerm}
            />
            <SiteSettingTable 
              TableProps={{ dataSource: filteredSiteList }} 
              handleClickRow={handleClickRow} 
              setClickEditButton={handleEditButtonClick} 
              setSelectedSites={setSelectedSites}
              selectedSites={selectedSites}
            />
            <ModalContainer>
              <NewSiteModal
                visible={isNewSiteModalVisible}
                onClose={setIsNewSiteModalVisible}
                onAddSite={handleAddSite}
              />
              <EditSiteModal
                visible={isEditSiteModalVisible}
                data={editSiteData}
                onClose={setIsEditSiteModalVisible}
                onEditSite={handleEditSiteSubmit}
              />
              <ConfirmModal
                visible={isConfirmModalVisible}
                text={confirmText}
                onClose={setIsConfirmModalVisible}
                handleDelete={handleDeleteSite}
              />
            </ModalContainer>
          </div>
        ) 
      }


    </div>
  );
};

export default SiteSettingTab;

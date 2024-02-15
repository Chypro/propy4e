import React, { useState, useEffect } from 'react';
import { SettingHeader, CategoryTree } from '../../..';
import { Button, TableProps, Flex, Space } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { TreeNodeType } from '../../../../types/app/categories';
import { NewSiteCategoryModal } from '..';
import { ModalContainer, ConfirmModal } from '../../..';
import { useUpdateSiteCategoryMutation, useCreateSiteCategoryMutation, useDeleteSiteCategoryMutation, createSiteCategoryBodyType } from '../../../../services/sitesApi';

type Props = {
  siteProps: TableProps;
  setDetailPage: () => void;
  dataTree: TreeNodeType[];
};
const SiteDetailPage = ({ siteProps, setDetailPage, dataTree }: Props) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [isNewSiteCategoryModalVisible, setIsNewSiteCategoryModalVisible] = useState(false);

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  
  const [
    updateSiteCategory,
    { isLoading: isUpdateSiteCategoryLoading, isError: isUpdateSiteCategoryError, isSuccess: isUpdateSiteCategorySuccess }
  ] = useUpdateSiteCategoryMutation();
  const [ 
    createSiteCategory,
    { isLoading: isCreateSiteCategoryLoading, isError: isCreateSiteCategoryError, isSuccess: isCreateSiteCategorySuccess }
  ] = useCreateSiteCategoryMutation();
  const [ 
    deleteSiteCategory,
    { isLoading: isDeleteSiteCategoryLoading, isError: isDeleteSiteCategoryError, isSuccess: isDeleteSiteCategorySuccess }
  ] = useDeleteSiteCategoryMutation();
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    console.log("searchTerm :>>", searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    console.log("siteProps :>>", siteProps);
  }, [siteProps]);

  const handleAddCategory = (data: createSiteCategoryBodyType) => {
    console.log("add site category:>>", data);
    // createSiteCategory(siteProps['コード'], data).then((res: any) => {
    //   console.log('res :>> ', res);
    //   if (res.error) {
    //     console.error('データを追加できませんでした');
    //   } else if(res.data.result === 'success'){
    //     getSiteListQuery.refetch()
    //     console.log('データを追加しました:>>');
    //   }
    // });
    // setIsNewSiteModalVisible(false);
  }

  const handleClickDelete = () => {
    //削除確認を表示
    setIsConfirmModalVisible(true);
  }

  const handleDeleteCategory = (isDelete: boolean) => {
    //選択したカテゴリの削除
    if (isDelete) {
      console.log("selectedCode:>>");
    } else {
      console.log("cancel delete");
    }
  }

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <Flex>
        <Space>
          <Button type='text' onClick={setDetailPage} icon={<DoubleLeftOutlined />}/>
          <h3>{siteProps['名前']}</h3>
        </Space>
      </Flex>
      <SettingHeader 
        settingHeaderText={"サイトカテゴリ"} 
        setSearchTerm={setSearchTerm} 
        setIsModalVisible={setIsNewSiteCategoryModalVisible} 
        isDeleteDisabled={true} 
        onDelete={handleClickDelete}
      />
      <CategoryTree searchTerm={searchTerm} dataTree={dataTree} setSelectedCategoryName={setSelectedCategoryName}/>

      <ModalContainer>
        <NewSiteCategoryModal
          visible={isNewSiteCategoryModalVisible}
          categoryName={selectedCategoryName}
          onClose={setIsNewSiteCategoryModalVisible}
          onAddSiteCategory={handleAddCategory}
        />
        <ConfirmModal
          visible={isConfirmModalVisible}
          text={selectedCategoryName}
          onClose={setIsConfirmModalVisible}
          handleDelete={handleDeleteCategory}
        />
      </ModalContainer>
    </div>
  )
}

export default SiteDetailPage;

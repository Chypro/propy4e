import React, { useEffect, useState } from 'react';
import { SettingHeaderV2 } from '../../..';
import { ProductClassificationSettingTable, ProductClassificationDetailPage } from '..';
import { useGetproductClassificationsQuery } from '../../../../services/productClassificationsApi';
import {
  useGetAttributesByProductClassificationAndChannelMutation,
  useGetAttributesByProductClassificationMutation
} from '../../../../services/attributesApi';
import { ModalContainer, ConfirmModal, AddDataModal } from '../../..';
import { TableProps } from 'antd';

const ProductClassificationSettingTab = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const tabTitle = '商品分類';
  const [searchTerm, setSearchTerm] = useState('');
  const [productClassificationsList, setProductClassificationsList] = useState<any>([]);
  const [filteredProductClassificationsList, setFilteredProductClassificationsList] = useState<TableProps[]>([]);
  const [selectedProductClassifications, setSelectedProductClassifications] = useState<TableProps[]>([]);
  const [clickProductClassification, setClickProductClassification] = useState<TableProps>(null);
  const [isOpenDetailPage, setIsOpenDetailPage] = useState(false);

  const [isAddDataModalVisible, setIsAddDataModalVisible] = useState(false);
  const [isNewProductClassificationModalVisible, setIsNewProductClassificationModalVisible] =
    useState(false);

  const [isSelfModalVisible, setIsSelfModalVisible] = useState(false);
  const [isFileModalVisible, setIsFileModalVisible] = useState(false);

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>('');

  const getProductClassificationsQuery = useGetproductClassificationsQuery();
  const [getAttributesByClassification, { isError, isSuccess: isSuccessTwo }] =
    useGetAttributesByProductClassificationMutation();
  const [getAttributesByProductClassificationAndChannel, { isSuccess: isSuccessthree }] =
    useGetAttributesByProductClassificationAndChannelMutation();

  const [displayAttribute, setdisplayAttribute] = useState();
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    console.log('object');
    if (getProductClassificationsQuery.isSuccess) {
      setProductClassificationsList(getProductClassificationsQuery.data.data);
      console.log(
        'get product classification list success :>>',
        getProductClassificationsQuery.data.data
      );
    }
  }, [getProductClassificationsQuery.data]);

  useEffect(() => {
    if (productClassificationsList) {
      const newProductClassificationsList = productClassificationsList.map(
        (item: any, i: number) => {
          return {
            商品分類名: item.name,
            商品数: item.product_count,
            項目数: item.attribute_count,
            作成日: item.created_at,
            作成したユーザー: item.created_by,
            コード: item.cd
          };
        }
      );
      setFilteredProductClassificationsList(
        newProductClassificationsList.filter((item: any) => item['商品分類名'].includes(searchTerm))
      );
    }
  }, [productClassificationsList, searchTerm]);

  const setDetailPage = () => {
    //詳細ページから戻るボタンをクリック
    setIsOpenDetailPage(false);
  };

  const handleClickRow = (data: TableProps) => {
    //商品分類一覧テーブルの行をクリック
    setIsOpenDetailPage(true);
    setClickProductClassification(data);
    //setClickSiteCode(data['コード']);
    setSelectedProductClassifications([]);
  };

  const handleClickDelete = () => {
    //削除確認を表示
    const text = selectedProductClassifications.map((item) => item['商品分類名']).toString();
    setConfirmText(text);
    setIsConfirmModalVisible(true);
  };

  const handleDeleteProductClassifications = (isDelete: boolean) => {
    //選択したサイトの削除
    if (isDelete) {
      console.log(
        'delete product classification:>>',
        selectedProductClassifications.map((item) => item['商品分類名']).toString()
      );
    } else {
      console.log('cancel delete');
    }
  };

  const handleSelfClick = () => {
    setIsSelfModalVisible(false);
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      {isOpenDetailPage ? (
        <ProductClassificationDetailPage setDetailPage={setDetailPage} clickProductClassification={clickProductClassification}/>
      ) : (
        <div>
          <SettingHeaderV2
            settingHeaderText={tabTitle}
            setSearchTerm={setSearchTerm}
            setIsModalVisible={setIsAddDataModalVisible}
          />
          <ProductClassificationSettingTable
            TableProps={{ dataSource: filteredProductClassificationsList }}
            handleClickRow={handleClickRow}
            setSelectedProductClassifications={setSelectedProductClassifications}
            selectedProductClassifications={selectedProductClassifications}
            handleDeleteModalOpen={handleClickDelete}
          />
          <ModalContainer>
            {/* <NewSiteCategoryModal
            visible={isSelfModalVisible}
            onAddSiteCategory={handleAddCatgory}
            onClose={setIsSelfModalVisible}
            categoryName={"テスト"}
          /> */}
            <AddDataModal
              visible={isAddDataModalVisible}
              onClose={setIsAddDataModalVisible}
              text={tabTitle}
              setIsSelfModalVisible={handleSelfClick}
              setIsFileModalVisible={setIsFileModalVisible}
            />
            <ConfirmModal
              visible={isConfirmModalVisible}
              text={confirmText}
              onClose={setIsConfirmModalVisible}
              handleDelete={handleDeleteProductClassifications}
            />
          </ModalContainer>
        </div>
      )}
    </div>
  );
};

export default ProductClassificationSettingTab;
